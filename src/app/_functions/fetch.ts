import db from "@/server/db";
import { categorySchema } from "@/server/db/schema";
import { asc } from 'drizzle-orm';

export const getAllCategories = async () => {
  const data = await db.select().from(categorySchema).orderBy(asc(categorySchema.id));

  return data;
};

export const getRandomThreeCategories = async () => {
  const data = await getAllCategories()

  const rand_1 = Math.floor(Math.random() * data.length)
  const rand_2 = Math.floor(Math.random() * data.length)
  const rand_3 = Math.floor(Math.random() * data.length)

  return [data[rand_1], data[rand_2], data[rand_3]]
}