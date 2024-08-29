"use client"

import { useGame } from "@/app/_components/GameContext"
import styles from "./styles.module.scss"

export default function Skills(){

    const { player } = useGame()

    return (
        <div className={styles.power_move_wrapper}>
            <div
                className={styles.charge}
                style={
                    Object.assign(
                        {width: player.skills[0]?.charge + "%"},
                        player.skills[0]?.charge == 100
                        ? {animation: "styles_glow__fupwo 0.75s infinite alternate"}
                        : {}
                    )
                }
            ></div>
        </div>
    )
}