import { type Upgrade, type Category, type Card, type newScore } from "@/app/_types/types";
import db from "@/server/db";
import { categorySchema, questionSchema, scoreSchema, upgradeSchema } from "@/server/db/schema";
import { asc, desc, eq } from 'drizzle-orm';

export async function getAllCategories(): Promise<(Category | undefined)[]>  {
  const data: Category[] = await db.select().from(categorySchema).orderBy(asc(categorySchema.id));

  return data;
};

export async function getAllUpgrades(): Promise<(Upgrade | undefined)[]> {
  const data: Upgrade[] = await db.select().from(upgradeSchema).orderBy(asc(categorySchema.id))
  return data;
}

export async function getAllCards() {
  const data = await db.select().from(questionSchema).leftJoin(categorySchema, eq(categorySchema.id,questionSchema.category_id))

  return data
}

export const getRandomThreeCards = async (): Promise<(Card)[]> => {
  const data: Card[] = await getAllCards()

  if(!data) throw new Error("Failed to fetch categories");

  const validCategories: Card[] = data.filter((card): card is Card => card !== undefined);

  const arr: Card[] = [];
  const usedIndices: Set<number> = new Set();

  while (arr.length < 3) {
    const randInt: number = Math.floor(Math.random() * validCategories.length);

    if (!usedIndices.has(randInt)) {
      const selectedCard = validCategories[randInt];
      if (selectedCard) {
        arr.push(selectedCard);
        usedIndices.add(randInt);
      }
    }
  }

  return arr;
}

export async function getRandomUpgrade(): Promise<(Upgrade | undefined)> {
  const data: Upgrade[] = await db.select().from(upgradeSchema).orderBy(asc(upgradeSchema.id))

  const randInt = Math.floor(Math.random() * data.length)

  return data[randInt]
}

export async function getCardData() {
  const data = await db.select().from(questionSchema).leftJoin(categorySchema, eq(categorySchema.id,questionSchema.category_id))

  return data;
}

export async function getScoreboard() {
  const data = await db.select().from(scoreSchema).orderBy(desc(scoreSchema.score))
  return data;
}

export async function postScore(score: newScore ) {
  await db.insert(scoreSchema).values(score).returning();
}