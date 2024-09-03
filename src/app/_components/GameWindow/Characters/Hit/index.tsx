"use client"

import { useSettings } from "@/app/_components/SettingsContext";
import styles from "./styles.module.scss";
import { useGame } from "@/app/_components/GameContext";

export default function Hit({dmg}: {dmg: number}) {

    const { damageNumbers } = useSettings()
    const { player } = useGame()

    return (
        <>
        {
            !player.agility
            ?
            <div className={styles.hit}>
                {damageNumbers ? Math.floor(dmg) : dmg}
            </div>
        
        : "" 
        }
        </>
    )
}