import { Enemy } from "@/app/_types/types";
import sprites from "@/styles/components/GameWindow/sprites.module.scss";

export const goblin = (goblin: Enemy, arr: Enemy[], enemyBool: boolean, playerBool: boolean) => {
    if(!arr) return "";

    const first = arr[0];
    if(!first) return "";
    if(first.hp <= 0 && goblin.id === first.id) return sprites.goblinDeathAnim;
    if(playerBool && goblin.id === first.id) return sprites.goblinHitAnim;
    if(enemyBool) return sprites.goblinAttackAnim; 
    if(first.name === "Goblin") return `sprites.${"goblin"}`;
}