/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

import { type Consumable, type ConsumableNames, type PlayerType, type Enemy } from "../_types/types"
import { enemyStats } from "./enemies";
import { CONSTANTS } from "./CONSTANTS";

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

    if(loop > CONSTANTS.MAX_SET_ROUND){

        const amount = adjustDifficulty(loop)

        const enemyArray: Enemy[] = [...Array.from({length:randomInt(amount,4)}).map((x, index) => {

            let hp = randomInt((2 + Math.floor(loop*1.09)),2)
            const dmg = randomInt((2 + Math.floor(loop*0.8)),1)
            const armour = randomInt((1 + Math.floor(Math.floor((loop *0.4))*1.06)),1)

            if(hp <= 0) {
                hp = 1
            }

            const enemies = ["Goblin","Mushroom","Skeleton","Flying Eye", "Toad", "Fireworm"]
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
        0: ["Goblin", "Goblin"],
        1: ["Goblin","Goblin", "Goblin"],
        2: ["Mushroom","Goblin"],
        3: ["Mushroom","Goblin","Mushroom"],
        4: ["Goblin","Mushroom","Mushroom"],
        5: ["Mushroom","Goblin","Goblin"],
        6: ["Toad","Mushroom","Goblin"],
        7: ["Toad","Goblin","Mushroom","Toad","Goblin"],
        8: ["Toad","Goblin","Goblin", "Goblin"],
        9: ["Mushroom","Goblin","Toad","Mushroom","Goblin",],
        10: ["Demon Slime"],
        11: ["Flying Eye","Fireworm","Flying Eye", "Mushroom"],
        12: ["Flying Eye","Fireworm","Goblin","Fireworm"],
        13: ["Flying Eye","Mushroom","Fireworm","Toad"],
        14: ["Toad", "Skeleton", "Mushroom", "Goblin"],
        15: ["Fireworm", "Fireworm", "Mushroom", "Toad"],
    }

    return basicRounds[loop]
}

export function randomItem(){
    const items: ConsumableNames[] = [
        "Health Potion",
        "Mana Potion",
        "Agility Crystal",
        "Firebomb",
        // "Bomb",
    ]
    const item = items[Math.floor(Math.random() * items.length)]
    return item!
}

export function getItemIndex(item: Consumable, player: PlayerType){
    return player.consumables.indexOf(item)
}

export function handleHpBar(character: PlayerType | Enemy){
    if((character.hp / character.maxhp) <= 0) {
        return {
            "width":"0%",
            "backgroundColor":"transparent",
            "boxShadow": "transparent inset 0 0 "
        }
    }
    if((character.hp / character.maxhp) < 0.3) {
        return {
            "backgroundColor":"hsl(358, 100%, 45%)",
            "boxShadow": "hsl(358, 100%, 21%) inset 0 -3px 0 0",
            "width":`${(character.hp/character.maxhp)*100}%`
        }
    }
    else if((character.hp / character.maxhp) < 0.6) {
        return {
            "backgroundColor":"hsl(30, 100%, 45%)",
            "boxShadow": "hsl(14, 100%, 39%) inset 0 -3px 0 0",
            "width":`${(character.hp/character.maxhp)*100}%`
        }
    }
    else{
        return {
            "width":`${(character.hp/character.maxhp)*100}%`
        }
    }
}
