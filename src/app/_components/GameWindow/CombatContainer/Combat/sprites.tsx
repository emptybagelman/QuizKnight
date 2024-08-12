import { type Enemy, type Player } from "@/app/_types/types";
import sprites from "./sprites.module.scss";

export const playerAnims = (player: Player, enemyBool: boolean, playerBool: boolean) => {
    if(player.hp <= 0) return sprites.playerDeathAnim;
    if(enemyBool) return sprites.playerHitAnim;
    if(playerBool) return sprites.playerAttackAnim;
    return sprites.player;
}

const goblinAnims = (goblin: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];

    if(!arr) return "";
    if(!first) return "";

    if(!(first.id === goblin.id)) return sprites.goblin;
    if(first.hp <= 0 && goblin.id === first.id) return sprites.goblinDeathAnim;
    if(playerBool && goblin.id === first.id) return sprites.goblinHitAnim;
    if(enemyBool) return sprites.goblinAttackAnim; 
    return sprites.goblin;
}

export const mushroomAnims = (mushroom: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(!(first.id === mushroom.id)) return sprites.mushroom;
    if(first.hp <= 0 && mushroom.id === first.id) return sprites.mushroomDeathAnim;
    if(playerBool && mushroom.id === first.id) return sprites.mushroomHitAnim;
    if(enemyBool) return sprites.mushroomAttackAnim; 
    return sprites.mushroom;
}

export const skeletonAnims = (skeleton: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(!(first.id === skeleton.id)) return sprites.skeleton;
    if(first.hp <= 0 && skeleton.id === first.id) return sprites.skeletonDeathAnim;
    if(playerBool && skeleton.id === first.id) return sprites.skeletonHitAnim;
    if(enemyBool) return sprites.skeletonAttackAnim; 
    return sprites.skeleton;
}

export const eyeAnims = (eye: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    const first = arr[0];
    
    if(!arr) return "";
    if(!first) return "";

    if(!(first.id === eye.id)) return sprites.eye;
    if(first.hp <= 0 && eye.id === first.id) return sprites.eyeDeathAnim;
    if(playerBool && eye.id === first.id) return sprites.eyeHitAnim;
    if(enemyBool) return sprites.eyeAttackAnim; 
    return sprites.eye;
}

export const resolveAnimType = (enemy: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    if(enemy.name === "Goblin") return goblinAnims(enemy, arr, enemyBool, playerBool)
    if(enemy.name === "Mushroom") return mushroomAnims(enemy, arr, enemyBool, playerBool)
    if(enemy.name === "Skeleton") return skeletonAnims(enemy, arr, enemyBool, playerBool)
    if(enemy.name === "Flying Eye") return eyeAnims(enemy, arr, enemyBool, playerBool)
}