"use client"

import styles from "./styles.module.scss"
import { useCombat } from "@/app/_components/CombatContext"

import goblin_head from "#/sprites/goblin/goblin_head.png"
import mushroom_head from "#/sprites/mushroom/mushroom_head.png"
import skeleton_head from "#/sprites/skeleton/skeleton_head.png"
import flying_eye_head from "#/sprites/flyingeye/flying_eye_head.png"
import toad_head from "#/sprites/toad/toad_head.png"
import fireworm_head from "#/sprites/fireworm/fireworm_head.png"
import slime_head from "#/sprites/slime/slime_head.png"
import sprout_head from "#/sprites/sprout/sprout_head.png"
import { handleHpBar } from "@/app/_functions/game_functions"
import { CONSTANTS } from "@/app/_functions/CONSTANTS"

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
            case "Fireworm":
                return fireworm_head.src;
            case "Slime":
                return slime_head.src;
            case "Sprout":
                return sprout_head.src;
            default:
                return goblin_head.src;
        }
    }

    return (
        <div className={styles.eneminis_wrapper} content={`${enemyData.length <= CONSTANTS.HEADCOUNT ? "obscure" : "show"}`}>
            {
                enemyData && enemyData.slice(0,CONSTANTS.HEADCOUNT).map((enemy, idx) => (
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
                { enemyData.length > CONSTANTS.HEADCOUNT &&
                    "+"+enemyData.slice(CONSTANTS.HEADCOUNT,enemyData.length).length
                }
            </p>
        </div>
    )
}