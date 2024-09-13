"use client"

import { CONSTANTS } from "@/app/_functions/CONSTANTS";
import { useGame } from "../../GameContext";
import styles from "./styles.module.scss";
import { type Background } from "@/app/_types/types";

export default function CombatContainer({children, background}:{children: React.ReactNode, background: Background}){

    const { gameState } = useGame()

    return (
        <div className={`${
            gameState.loop <= CONSTANTS.BOSS_ROUND
            ? styles.morning_forest
            : styles.dark_forest
        } ${
            background === "power_shake"
            ? styles.power_shake
            :
            background === "shake"
            ? styles.screen_shake
            : ""

        }`}>
            { children }
        </div>
    )
}