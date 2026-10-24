import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const siteContent = sqliteTable('site_content', {
 id: integer('id').primaryKey(),
 content: text('content').notNull(),
 revision: integer('revision').notNull().default(0),
 editorId: text('editor_id').notNull(),
});
