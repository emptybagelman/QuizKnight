/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

import { type Enemy } from "../_types/types"
import { enemyStats } from "./enemies";

function randomEnemy(enemies: string[]) {
        
    const randFloat = Math.random() * enemies.length;
    const randInt = Math.floor(randFloat)
    return enemies[randInt]
}

export function randomInt(mid: number, range: number){
    const min = mid - range
    const max = mid + range
    return Math.floor(Math.random() * (max-min+1)) + min
}

export function adjustDifficulty(loop: number){
    return 1 + Math.floor(loop * 0.5)
}

export default function generateEnemies(loop: number) {

    if(loop > 13){

        const amount = adjustDifficulty(loop)

        const enemyArray: Enemy[] = [...Array.from({length:amount}).map((x, index) => {

            let hp = randomInt((2 + Math.floor(loop*1.09)),2)
            const dmg = randomInt((2 + Math.floor(loop*0.8)),1)
            const armour = randomInt((1 + Math.floor(Math.floor((loop *0.4))*1.06)),1)

            if(hp <= 0) {
                hp = 1
            }

            const enemies = ["Goblin","Mushroom","Skeleton","Flying Eye", "Toad"]
            const name = randomEnemy(enemies)

            const en = {
                id: index,
                name: name!,
                hp: hp,
                maxhp: hp,
                armour: armour,
                dmg: dmg,
            }

            return en;
            })
        ]

        return enemyArray;
    }
    else {
        const enemyGroup = enemyLoopGen(loop)!
        const enemyArray: Enemy[] = enemyGroup.map((enemy,index) => {
            const stats = enemyStats(enemy, loop)

            const en = {
                id: index,
                name: enemy,
                hp: stats.hp,
                maxhp: stats.hp,
                armour: stats.armour,
                dmg: stats.dmg
            }

            return en;
        })

        return enemyArray;
    }
}

function enemyLoopGen(loop: number) {
    const basicRounds: {[key:number]: string[]} = {
        0: ["Goblin"],
        1: ["Toad","Goblin"],
        2: ["Mushroom","Goblin"],
        3: ["Mushroom","Goblin","Mushroom"],
        4: ["Goblin","Goblin","Mushroom"],
        5: ["Mushroom","Mushroom","Mushroom"],
        6: ["Toad","Mushroom","Goblin"],
        7: ["Toad","Toad","Toad"],
        8: ["Toad","Flying Eye"],
        9: ["Goblin","Flying Eye","Mushroom"],
        10: ["Skeleton","Flying Eye","Flying Eye"],
        11: ["Flying Eye","Flying Eye","Goblin","Goblin"],
        12: ["Flying Eye","Mushroom","Toad","Toad"],
        13: ["Toad", "Skeleton", "Mushroom", "Goblin"]
    }

    return basicRounds[loop]
}

export function randomItem(){
    const items = [
        "Health Potion",
        "Mana Potion",
        "Agility Crystal",
        "Firebomb",
        // "Bomb",
    ]
    const item = items[Math.floor(Math.random() * items.length)]
    return item!
}