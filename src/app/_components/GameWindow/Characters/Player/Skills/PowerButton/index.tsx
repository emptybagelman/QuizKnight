/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */

"use client"

import { useGame } from "@/app/_components/GameContext"
import styles from "../styles.module.scss"
import { useCombat } from "@/app/_components/CombatContext"
import { type Enemy } from "@/app/_types/types"
import usePlayer from "@/app/_hooks/usePlayer"
import useAudio from "@/app/_hooks/useVolume"

export default function PowerButton({buttonState, setPowerState}:{buttonState: boolean, setPowerState: React.Dispatch<React.SetStateAction<boolean>>}){

    const { player, gameState } = useGame()
    const { enemyData, setEnemyData, setPlayerAttack } = useCombat()
    const { setCurrentDialogue } = useCombat()
    const { updateSkills } = usePlayer()
    const { playChargeSound, playPowerMoveSound, playHitImpactSound } = useAudio()

    function handleClick(){
        if(buttonState) return;
        const enemies: Enemy[] = []
        setPowerState(true)
        playChargeSound()
        setPlayerAttack(true)
        setTimeout(() => {
            playPowerMoveSound()
            playHitImpactSound()
            setPlayerAttack(false)

            setCurrentDialogue({
                enemy:enemyData[0]!,
                active: true,
                index: 9
            })

            enemies.push(enemyData[0]!)

            if(enemyData.length > 2) {
                enemies.push(enemyData[1]!,enemyData[2]!)
            }
            if(enemyData.length > 1) {
                enemies.push(enemyData[1]!)
            }

            for(const enemy of enemies){
                enemy.hp -= player.dmg*0.75
                enemy.armour = 0
            }

            
            const newEnemyData: any = enemyData.map((enemy: Enemy) => {
                if(enemyData.indexOf(enemy) > 2) return enemy;
                const e = enemies.filter((en) => en.id == enemy.id)
                return e[0]
            })

            updateSkills(0, 0, true)

            setEnemyData(() => (newEnemyData))

            setTimeout(() => {
                setCurrentDialogue({
                    enemy: enemyData[0]!,
                    active: false,
                    index: -1,
                })
            }, 3000);
        }, 200);

    }

    if(!player.skills[0]) return;
    return (
        <>
        {
            player.skills[0].charge! >= 100 &&
            <a
                id={styles.power_button}
                onClick={handleClick}
                style={ buttonState || gameState.autoPlay ? {pointerEvents:"none"} : {} }>
                Power
            </a>
        }
        </>
    )
}