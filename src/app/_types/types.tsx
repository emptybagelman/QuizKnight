export type Player = {
    name: string,
    hp: number,
    maxhp: number,
    dmg: number,
    armor: number,
    resistance: number,
}

export type Enemy = {
    id: number,
    name: string,
    hp: number,
    maxhp: number,
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