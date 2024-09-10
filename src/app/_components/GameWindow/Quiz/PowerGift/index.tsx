"use client"

import { useGame } from "@/app/_components/GameContext"
import styles from "./styles.module.scss"
import useAudio from "@/app/_hooks/useVolume"
import { type GameStateProps } from "@/app/_types/types"
import usePlayer from "@/app/_hooks/usePlayer"

export default function PowerGift(){

    const { player, setGameState } = useGame()
    const { toggleSkills, setMaxHp } = usePlayer()
    const { playHoverSound, playCorrectSound } = useAudio()

    function handleClick(){
        playCorrectSound()
        toggleSkills(0,true)
        setMaxHp()
        setGameState((prev: GameStateProps) => ({
            ...prev,
            quizState: false,
            powerState: false,
            loop: prev.loop + 1
        }))

    }

    return (
        <div className={styles.powergift_wrapper}>
            <h2>New!</h2>
            <h1>{player.skills[0]?.name}</h1>
            <div className={styles.power_image}></div>

            <p>{player.skills[0]?.description}</p>

            <a
                className={styles.continue}
                onMouseOver={() => playHoverSound()}
                onClick={handleClick}
            
            >Continue</a>
        </div>
    )
}