"use client"

import styles from "./styles.module.scss"
import MainMenuSettings from "./MainMenuSettings"
import { useSettings } from "../SettingsContext"
import useAudio from "@/app/_hooks/useVolume"

export default function SettingsButton(){

    const { open, setOpen } = useSettings()
    const { playSelectSound } = useAudio()

    function handleClick() {
        setOpen(prev => !prev)
        playSelectSound()
    }

    return (
        <>
            <a
                className={styles.settings_button}
                onClick={handleClick}
            >
                Settings
            </a>
            {
                open &&
                <MainMenuSettings />
            }
        </>

    )
}