"use client"

import styles from "./styles.module.scss";
import { Background } from "@/app/_types/types";

export default function CombatContainer({children, background}:{children: React.ReactNode, background: Background}){

    return (
        <div className={`${styles.combat_window} ${
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