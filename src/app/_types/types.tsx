import { type scoreSchema } from "@/server/db/schema"

export type PlayerType = {
    name: string,
    hp: number,
    maxhp: number,
    dmg: number,
    armour: number,
    maxarmour: number,
    resistance: number,
    critical: number,
    parry: number,
    looting: number
    agility: number,
    skills: Skill[] | [],
    consumables: Consumable[]
}

export type Skill = {
    id: number,
    name: string,
    type: string,
    charge?: number,
    active: boolean,
    description: string,
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
    extra?: string | number
}

export type StatType = {
    string: string,
    name: string
}

export type CharacterNames = string

export type ConsumableNames = "Health Potion" | "Mana Potion" | "Agility Crystal" | "Firebomb"


export type TimeoutFunctionProps = {
    delay: number,
    func: (() => void)[]
}

export type GameStateProps = {
    loop: number,
    score: number,
    quizState: boolean,
    questionState: boolean,
    statsState: boolean,
    powerState: boolean,
    currentUpgrade: Upgrade | undefined,
    currentCard: Card | undefined,
    autoPlay: boolean,
    statToken: number,
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
    name: ConsumableNames,
    value: number,
    description: string,
    charge?: number,
}

export type Background = "shake" | "power_shake" | "default" 