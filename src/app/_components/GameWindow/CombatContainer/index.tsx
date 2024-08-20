"use client"

import { useCombat } from "../../CombatContext";
import styles from "./styles.module.scss";

export default function CombatContainer({children}:{children: React.ReactNode}){

    const { playerAttack, enemyAttack } = useCombat()

    return (
        <div className={`${styles.game_window} ${
            playerAttack || enemyAttack
            ? styles.screen_shake
            : ""

        }`}>
            { children }
        </div>
    )
}