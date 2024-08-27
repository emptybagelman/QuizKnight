"use client"

import { useSettings } from "@/app/_components/SettingsContext";
import styles from "./styles.module.scss";

export default function Hit({dmg, parry}: {dmg: number, parry: boolean}) {

    const { damageNumbers } = useSettings()

    return (
        <div className={parry ? styles.block : styles.hit}>
            {damageNumbers ? Math.floor(dmg) : dmg}
        </div>
    )
}