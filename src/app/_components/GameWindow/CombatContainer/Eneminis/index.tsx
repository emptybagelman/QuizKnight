"use client"

import styles from "./styles.module.scss"
import { useCombat } from "@/app/_components/CombatContext"

import goblin_head from "#/goblin_head.png"
import mushroom_head from "#/mushroom_head.png"
import skeleton_head from "#/skeleton_head.png"
import flying_eye_head from "#/flying_eye_head.png"
import toad_head from "#/toad_head.png"
import { handleHpBar } from "@/app/_functions/game_functions"

const HEADCOUNT = 3

export default function Eneminis(){
    const { enemyData } = useCombat()

    function getHead(name: string){
        switch(name){
            case "Goblin":
                return goblin_head.src;
            case "Mushroom":
                return mushroom_head.src;
            case "Skeleton":
                return skeleton_head.src;
            case "Flying Eye":
                return flying_eye_head.src;
            case "Toad":
                return toad_head.src;
            default:
                return goblin_head.src
        }
    }

    return (
        <div className={styles.eneminis_wrapper} content={`${enemyData.length <= HEADCOUNT ? "obscure" : "show"}`}>
            {
                enemyData && enemyData.slice(0,HEADCOUNT).map((enemy, idx) => (
                    <div
                        key={"mini"+idx}
                        className={styles.enemy_head}
                        style={{backgroundImage:`url(${getHead(enemy.name)})`}}
                    
                    >
                        <div
                            className={styles.mini_hp_bar}
                            style={handleHpBar(enemy)}
                        ></div>
                    </div>
                ))
            }
            <p id={styles.remaining}>
                { enemyData.length > HEADCOUNT &&
                    "+"+enemyData.slice(HEADCOUNT,enemyData.length).length
                }
            </p>
        </div>
    )
}