const NOTION_API = "https://api.notion.com/v1";
const NOTION_VERSION = "2025-09-03";

// The "Aura contact" database in Notion. Not a secret; the token is.
const DEFAULT_DATABASE_ID = "3e67fb31ce378044a332cdf02be00cb2";

// Notion rejects rich text longer than this in a single text object.
const TEXT_LIMIT = 2000;

export type ContactMessage = {
  topic: string;
  email: string;
  message: string;
  device: string;
  ios: string;
};

type PropertySchema = { type: string };

let schemaCache: Promise<{ dataSourceId: string; properties: Record<string, PropertySchema> }> | null =
  null;

async function notion(path: string, init?: RequestInit) {
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN is not set");

  const response = await fetch(`${NOTION_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Notion ${init?.method ?? "GET"} ${path} failed: ${response.status} ${await response.text()}`);
  }
  return response.json();
}

/** Looks up the database's data source and its columns once per server instance. */
function loadSchema() {
  schemaCache ??= (async () => {
    const databaseId = process.env.NOTION_CONTACT_DATABASE_ID ?? DEFAULT_DATABASE_ID;
    const database = await notion(`/databases/${databaseId}`);
    const dataSourceId: string = database.data_sources[0].id;
    const dataSource = await notion(`/data_sources/${dataSourceId}`);
    return { dataSourceId, properties: dataSource.properties };
  })().catch((error) => {
    schemaCache = null;
    throw error;
  });
  return schemaCache;
}

const text = (content: string) => [{ type: "text", text: { content: content.slice(0, TEXT_LIMIT) } }];

/**
 * Fills whichever columns the database happens to have, matched by name, so
 * renaming or adding columns in Notion never breaks the form. The full message
 * also goes in the page body regardless.
 */
function buildProperties(schema: Record<string, PropertySchema>, entry: ContactMessage) {
  const properties: Record<string, unknown> = {};
  const summary = entry.message.replace(/\s+/g, " ").trim();

  for (const [name, { type }] of Object.entries(schema)) {
    const key = name.toLowerCase();

    if (type === "title") {
      properties[name] = { title: text(summary.length > 80 ? `${summary.slice(0, 77)}…` : summary) };
    } else if (/topic|type|category|kind/.test(key) && (type === "select" || type === "multi_select")) {
      properties[name] =
        type === "select" ? { select: { name: entry.topic } } : { multi_select: [{ name: entry.topic }] };
    } else if (/topic|type|category|kind/.test(key) && type === "rich_text") {
      properties[name] = { rich_text: text(entry.topic) };
    } else if (/e-?mail/.test(key) && type === "email") {
      properties[name] = { email: entry.email };
    } else if (/e-?mail/.test(key) && type === "rich_text") {
      properties[name] = { rich_text: text(entry.email) };
    } else if (/message|body|detail|description/.test(key) && type === "rich_text") {
      properties[name] = { rich_text: text(entry.message) };
    } else if (/ios|os version/.test(key) && type === "rich_text") {
      if (entry.ios) properties[name] = { rich_text: text(entry.ios) };
    } else if (/device|iphone|model/.test(key) && type === "rich_text") {
      if (entry.device) properties[name] = { rich_text: text(entry.device) };
    } else if (/date|submitted|received/.test(key) && type === "date") {
      properties[name] = { date: { start: new Date().toISOString() } };
    } else if (/source|from|origin/.test(key) && type === "select") {
      properties[name] = { select: { name: "Website" } };
    }
  }

  return properties;
}

function buildBody(entry: ContactMessage) {
  const paragraphs = [];
  for (let start = 0; start < entry.message.length; start += TEXT_LIMIT) {
    paragraphs.push({
      object: "block",
      type: "paragraph",
      paragraph: { rich_text: text(entry.message.slice(start, start + TEXT_LIMIT)) },
    });
  }

  const details = [
    `Topic: ${entry.topic}`,
    `Reply to: ${entry.email}`,
    entry.device && `iPhone model: ${entry.device}`,
    entry.ios && `iOS version: ${entry.ios}`,
  ].filter(Boolean) as string[];

  return [
    ...paragraphs,
    { object: "block", type: "divider", divider: {} },
    ...details.map((line) => ({
      object: "block",
      type: "bulleted_list_item",
      bulleted_list_item: { rich_text: text(line) },
    })),
  ];
}

export async function saveContactMessage(entry: ContactMessage) {
  const { dataSourceId, properties } = await loadSchema();
  await notion("/pages", {
    method: "POST",
    body: JSON.stringify({
      parent: { type: "data_source_id", data_source_id: dataSourceId },
      properties: buildProperties(properties, entry),
      children: buildBody(entry),
    }),
  });
}
