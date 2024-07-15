import { relations } from "drizzle-orm";
import { integer, text, boolean, pgTable, serial } from "drizzle-orm/pg-core";

export const categorySchema = pgTable("category", {
    id: serial("id").primaryKey(),
    category: text("category").notNull()
})

export const upgradeSchema = pgTable("upgrade", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    description: text("description").notNull(),
    affected_stat: text("affected_stat").notNull(),
    default_value: integer("default_value").notNull(),
    consumable: boolean("consumable").notNull()
})

export const questionSchema = pgTable("question", {
    id: serial("id").primaryKey(),
    difficulty: text("difficulty").notNull(),
    question: text("question").notNull(),
    answers: text("answers").array().notNull(),
    correct_index: integer("correct_index").notNull(),
    category_id: integer("category_id").notNull().references(() => categorySchema.id)
})

export const questionRelations = relations(questionSchema, ({one, many}) => ({
    questionSchema: one(categorySchema,{
        fields: [questionSchema.category_id],
        references: [categorySchema.id]
    } )
}))