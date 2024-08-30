/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

"use client"

import { useGame } from "@/app/_components/GameContext"
import styles from "../styles.module.scss"
import { useCombat } from "@/app/_components/CombatContext"
import { type Enemy } from "@/app/_types/types"

export default function PowerButton({buttonState}:{buttonState: boolean}){

    const { player } = useGame()
    const { enemyData, setEnemyData } = useCombat()

    function handleClick(){
        if(buttonState) return;
        const enemies: Enemy[] = []

        enemies.push(enemyData[0]!)

        if(enemyData.length > 2) {
            enemies.push(enemyData[1]!,enemyData[2]!)
        }
        if(enemyData.length > 1) {
            enemies.push(enemyData[1]!)
        }

        for(const enemy of enemies){
            enemy.hp /= 2 
        }

        
        const newEnemyData: any = enemyData.map((enemy: Enemy, idx: number) => {
            if(enemyData.indexOf(enemy) > 2) return enemy;
            const e = enemies.filter((en) => en.id == enemy.id)
            return e[0]
        })

        setPlayer((prev: PlayerType) => {
                        if(!prev.skills) return {
                            ...prev
                        };

                        const updatedSkills = [...prev.skills] as Skill[]
                        const charge = updatedSkills[0]?.charge

                        if(!(typeof charge == "number")) return {
                            ...prev
                        }

                       
                        
                        updatedSkills[0] = {
                            ...updatedSkills[0]!,
                            charge: 0
                        }

                        return {
                            ...prev,
                            skills: updatedSkills
                        }
                    })

        setEnemyData(() => (newEnemyData))

    }

    if(!player.skills[0]) return;
    return (
        <>
        {
            player.skills[0].charge! >= 100 &&
            <button id={styles.power_button} onClick={handleClick} disabled={buttonState}>
                Power
            </button>
        }
        </>
    )
}