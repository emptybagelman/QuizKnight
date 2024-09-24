import { CONSTANTS } from "./CONSTANTS";
import { randomInt } from "./game_functions";

export function enemyStats(name: string, loop:number) {
    let hp: number;
    let dmg: number;
    let armour: number;

    switch (name){
        case "Goblin":
            hp = randomInt((2 + Math.floor(loop * 0.9)), 1)
            dmg = randomInt((2 + Math.floor(loop * 0.5)), 1)
            armour = randomInt((0 + Math.floor(loop * 0.2)), 1)
            break;
        case "Mushroom":
            hp = randomInt((3 + Math.floor(loop * 1.1)), 2)
            dmg = randomInt((1 + Math.floor(loop * 0.6)), 1)
            armour = 0
            break;
        case "Skeleton":
            hp = randomInt((2 + Math.floor(loop * 1.1)), 1)
            dmg = randomInt((3 + Math.floor(loop * 1.4)), 1)
            armour = randomInt((1 + Math.floor(loop * 0.2)), 1)
            break;
        case "Flying Eye":
            hp = randomInt((3 + Math.floor(loop * 1.3)), 2)
            dmg = randomInt((2 + Math.floor(loop * 0.8)), 1)
            armour = 0
            break;
        case "Toad":
            hp = randomInt((4 + Math.floor(loop * 1.2)), 2)
            dmg = randomInt((2 + Math.floor(loop * 0.55)), 1)
            armour = 0
            break;
        case "Demon Slime":
        case "Graven Mass":
            hp = CONSTANTS.BASE_BOSS_HP * loop
            dmg = CONSTANTS.BASE_BOSS_DMG * (loop / 10)
            armour = 0
            break;
        case "Fireworm":
            hp = randomInt((2 + Math.floor(loop * 0.8)), 1)
            dmg = randomInt((2 + Math.floor(loop * 0.4)), 1)
            armour = 0
        case "Slime":
            hp = randomInt((2 + Math.floor(loop * 0.6)), 1)
            dmg = randomInt((2 + Math.floor(loop * 0.35)), 1)
            armour = 0
        case "Sprout":
            hp = randomInt((3 + Math.floor(loop * 1.45)), 1)
            dmg = randomInt((1 + Math.floor(loop * 1.1)), 1)
            armour = randomInt((2 + Math.floor(loop * 0.2)), 1)
        default:
            hp = randomInt((2 + Math.floor(loop * 1)), 1)
            dmg = randomInt((2 + Math.floor(loop * 1)), 1)
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