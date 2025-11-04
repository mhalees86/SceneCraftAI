import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface SceneParameters {
  tone?: string;
  timeOfDay?: string;
  cameraAngle?: string;
  platform?: string;
  weather?: string;
  genre?: string;
  mood?: string;
  landscape?: string;
  lighting?: string;
  framing?: string;
}

export interface Scene {
  id: string;
  name: string;
  description: string;
  parameters: SceneParameters;
  generatedPrompt?: string;
  mode: 'manual' | 'ai';
}

export interface Project {
  id: string;
  name: string;
  scenes: Scene[];
}

export const insertSceneSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  parameters: z.object({
    tone: z.string().optional(),
    timeOfDay: z.string().optional(),
    cameraAngle: z.string().optional(),
    platform: z.string().optional(),
    weather: z.string().optional(),
    genre: z.string().optional(),
    mood: z.string().optional(),
    landscape: z.string().optional(),
    lighting: z.string().optional(),
    framing: z.string().optional(),
  }),
  generatedPrompt: z.string().optional(),
  mode: z.enum(['manual', 'ai']),
});

export type InsertScene = z.infer<typeof insertSceneSchema>;
