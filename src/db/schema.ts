import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const emailSummaries = pgTable("email_summaries", {
  id: serial("id").primaryKey(),
  sender: text("sender"),
  subject: text("subject"),
  body: text("body"),
  summary: text("summary"),
  category: text("category"),
  createdAt: timestamp("created_at").defaultNow(),
});