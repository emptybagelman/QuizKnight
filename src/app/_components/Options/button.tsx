"use client"

import { useState } from "react"
import styles from "./styles.module.scss"

export default function SettingsButton(){

    const [openDialogue,setOpenDialogue] = useState<boolean>(false)

    return (
        <button onClick={() => setOpenDialogue(prev => !prev)} className={styles.settings_button}>
            Settings
        </button>
    )
}