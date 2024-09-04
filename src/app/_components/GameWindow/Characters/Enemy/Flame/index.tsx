"use client"

import { useGame } from "@/app/_components/GameContext"
import styles from "./styles.module.scss"

export default function Flame(){

    const { player } = useGame()

    return (
        <div className={`${player.consumables[3]?.charge && player.consumables[3]?.charge > 0 ? styles.flame : ""}`}>
        </div>
    )
}