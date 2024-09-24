/* eslint-disable @typescript-eslint/consistent-indexed-object-style */

import { type Consumable, type ConsumableNames, type PlayerType, type Enemy } from "../_types/types"
import { enemyStats } from "./enemies";
import { CONSTANTS } from "./CONSTANTS";
import { stat } from "fs";

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
        let enemyArray: Enemy[];
        if(loop > 0 && loop % CONSTANTS.BOSS_ROUND === 0){

            let bossStats;
            let bossName;

            if(loop == 20){
                bossStats = enemyStats("Graven Mass", loop)
                bossName = "Graven Mass"
            }else{
                bossStats = enemyStats("Demon Slime", loop)
                bossName = "Demon Slime"
            }

            enemyArray = [{
                id: 0,
                name: bossName,
                hp: bossStats.hp,
                maxhp: bossStats.hp,
                armour: bossStats.armour,
                dmg: bossStats.dmg
            }]
        }
        else{
            enemyArray = [...Array.from({length:randomInt(amount,4)}).map((x, index) => {

                let hp = randomInt((2 + Math.floor(loop*1.09)),2)
                const dmg = randomInt((2 + Math.floor(loop*0.8)),1)
                const armour = randomInt((1 + Math.floor(Math.floor((loop *0.4))*1.06)),1)

                if(hp <= 0) {
                    hp = 1
                }

                const enemies = ["Goblin","Mushroom","Skeleton","Flying Eye", "Toad", "Fireworm", "Slime"]
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
        }


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
        0: ["Slime", "Slime"],
        1: ["Slime","Goblin", "Slime"],
        2: ["Slime","Slime","Goblin","Goblin"],
        3: ["Mushroom","Slime","Slime","Mushroom","Goblin"],
        4: ["Goblin","Slime","Mushroom","Mushroom"],
        5: ["Mushroom","Goblin","Goblin","Slime","Goblin"],
        6: ["Goblin","Goblin","Toad","Mushroom"],
        7: ["Toad","Goblin","Slime","Slime","Mushroom","Toad","Goblin"],
        8: ["Toad","Toad","Goblin","Mushroom", "Goblin"],
        // 9: ["Slime","Slime","Mushroom","Goblin","Toad","Slime","Toad",],
        9: ["Slime"],
        10: ["Demon Slime"],
        11: ["Fireworm","Sprout","Sprout", "Sprout", "Flying Eye"],
        12: ["Flying Eye","Fireworm","Sprout","Fireworm"],
        13: ["Sprout","Sprout","Toad","Sprout"],
        14: ["Toad", "Skeleton", "Sprout", "Flying Eye"],
        15: ["Fireworm", "Fireworm", "Sprout", "Toad"],
        16: ["Skeleton", "Skeleton", "Sprout", "Sprout", "Flying Eye"],
        17: ["Toad", "Fireworm", "Fireworm", "Sprout", "Mushroom", "Sprout"],
        18: ["Mushroom", "Skeleton", "Skeleton", "Flying Eye", "Mushroom", "Sprout", "Flying Eye"],
        19: ["Flying Eye", "Toad", "Toad", "Flying Eye", "Sprout", "Slime", "Skeleton", "Skeleton", "Skeleton"],
        20: ["Graven Mass"]
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
