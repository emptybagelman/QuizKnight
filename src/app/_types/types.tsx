import { type scoreSchema } from "@/server/db/schema"

export type Player = {
    name: string,
    hp: number,
    maxhp: number,
    dmg: number,
    armour: number,
    resistance: number,
    critical: number,
    parry: number,
    consumables: Consumable[]
}

export type Enemy = {
    id: number,
    name: string,
    hp: number,
    maxhp: number,
    armour: number,
    dmg: number,
}

export type DialogueProps = {
    enemy: Enemy,
    active: boolean,
    index: number,
}

export type TimeoutFunctionProps = {
    delay: number,
    func: (() => void)[]
}

export type Category = {
    id: number,
    category: string
}

export type Upgrade = {
    id: number,
    name: string,
    description: string,
    affected_stat: string,
    default_value: number,
    consumable: boolean
}

export type Question = {
    id: number,
    difficulty: string,
    question: string,
    answers: string,
    correct_index: number,
    category_id: number,
}

export type Card = {
    question: {
        question: string;
        id: number;
        difficulty: string;
        answers: string[];
        correct_index: number;
        category_id: number;
    };
    category: {
        id: number;
        category: string;
    } | null;
}

export type newScore = typeof scoreSchema.$inferInsert

export type Score = {
    id: number,
    name: string,
    highest_loop: number,
    score: number,
}

export type soundType = string | string[]

export type Consumable = {
    id: number,
    name: string,
    value: number,
    description: string,
}