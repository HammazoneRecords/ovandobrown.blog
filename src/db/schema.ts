import { pgTable, text, serial, integer, timestamp } from 'drizzle-orm/pg-core';

export const comments = pgTable('obblog_comments', {
  id: serial('id').primaryKey(),
  postSlug: text('post_slug').notNull(),
  author: text('author').notNull(),
  text: text('text').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const posts = pgTable('obblog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  author: text('author').notNull().default('Ovando Brown'),
  category: text('category').notNull().default('Uncategorized'),
  excerpt: text('excerpt').default(''),
  content: text('content').default(''),
  coverImage: text('cover_image'),
  publishedAt: timestamp('published_at'),
  readingTime: integer('reading_time').default(5),
  listeningTime: integer('listening_time').default(5),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
