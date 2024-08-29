"use client"

import { useSettings } from "@/app/_components/SettingsContext";
import styles from "./styles.module.scss";
import { useGame } from "@/app/_components/GameContext";

export default function Hit({dmg, parry}: {dmg: number, parry: boolean}) {

    const { damageNumbers } = useSettings()
    const { player } = useGame()

    return (
        // <div className={parry ? styles.block : styles.hit}>
        <>
        {
            !player.agility
            ?
            <div
            className={styles.hit}
            style={parry
                ? {
                    backgroundSize: "48px 48px",
                    width: "48px",
                    height: "48px",
                }
                : {}
            }
        >
            {damageNumbers ? Math.floor(dmg) : dmg}
        </div>
        
        : "" 
        }
        </>
    )
}