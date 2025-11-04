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
  cameraMovement?: string;
  motionStyle?: string;
  aspectRatio?: string;
  duration?: string;
  colorGrading?: string;
  filmStock?: string;
  lens?: string;
  depth?: string;
  transition?: string;
  pacing?: string;
  visualStyle?: string;
  soundscape?: string;
}

export interface Scene {
  id: string;
  name: string;
  description: string;
  parameters: SceneParameters;
  generatedPrompt?: string;
  mode: 'manual' | 'ai';
}

export interface Favorite {
  id: string;
  name: string;
  description?: string;
  parameters: SceneParameters;
  prompt?: string;
  tags: string[];
  createdAt: string;
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
    cameraMovement: z.string().optional(),
    motionStyle: z.string().optional(),
    aspectRatio: z.string().optional(),
    duration: z.string().optional(),
    colorGrading: z.string().optional(),
    filmStock: z.string().optional(),
    lens: z.string().optional(),
    depth: z.string().optional(),
    transition: z.string().optional(),
    pacing: z.string().optional(),
    visualStyle: z.string().optional(),
    soundscape: z.string().optional(),
  }),
  generatedPrompt: z.string().optional(),
  mode: z.enum(['manual', 'ai']),
});

export type InsertScene = z.infer<typeof insertSceneSchema>;
