import { CONSTANTS } from "./CONSTANTS";

export function enemyStats(name: string, loop:number) {
    let hp: number;
    let dmg: number;
    let armour: number;

    function adjustStat(value: number, loop: number){
        return Math.floor(loop * value)
    }

    switch (name){
        case "Slime":
            hp = 2 + adjustStat(0.9, loop)
            dmg = 2 + adjustStat(0.4, loop)
            armour = 0
            break;
        case "Goblin":
            hp = 3 + adjustStat(1, loop)
            dmg = 2 + adjustStat(0.8, loop)
            armour = 0
            break;
        case "Mushroom":
            hp = 5 + adjustStat(1.5, loop)
            dmg = 2 + adjustStat(0.4, loop)
            armour =  0
            break;
        case "Skeleton":
            hp = 2 + adjustStat(0.7, loop)
            dmg = 4 + adjustStat(1.1, loop)
            armour = 0
            break;
        case "Flying Eye":
            hp = 3 + adjustStat(1.1, loop)
            dmg = 2 + adjustStat(0.6, loop)
            armour = 0
            break;
        case "Toad":
            hp = 5 + adjustStat(1.7, loop)
            dmg = 3 + adjustStat(0.65, loop)
            armour = 0
            break;
        case "Fireworm":
            hp = 3 + adjustStat(1, loop)
            dmg = 3 + adjustStat(0.6, loop)
            armour = 0
            break;
        case "Sprout":
            hp = 5 + adjustStat(1.55, loop)
            dmg = 3 + adjustStat(0.4, loop)
            armour = 2 + adjustStat(0.3, loop)
            break;
        case "Demon Slime":
        case "Graven Mass":
            hp = CONSTANTS.BASE_BOSS_HP * loop
            dmg = CONSTANTS.BASE_BOSS_DMG * (loop / 10)
            armour = 0
            break;
        default:
            hp = 3 + adjustStat(1, loop)
            dmg = 3 + adjustStat(1, loop)
            armour = 0
            break;
    }

    if(hp <= 0) {
        hp = 1
    }
    if(dmg <= 0) {
        dmg = 1
    }
    if(armour < 0) {
        armour = 0
    }

    return {hp: hp, dmg: dmg, armour: armour}
}