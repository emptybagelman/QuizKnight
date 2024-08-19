"use client"

import styles from "./styles.module.scss"
import MainMenuSettings from "./MainMenuSettings"
import { useSettings } from "../SettingsContext"
import useAudio from "@/app/_hooks/useVolume"

export default function SettingsButton(){

    const { open, setOpen } = useSettings()
    const { playHoverSound, playSelectSound } = useAudio()

    function handleClick() {
        setOpen(prev => !prev)
        playSelectSound()
    }

    return (
        <>
            <button
                className={styles.settings_button}
                onMouseEnter={() => playHoverSound()}
                onClick={handleClick}
            >
                Settings
            </button>
            {
                open &&
                <MainMenuSettings />
            }
        </>

    )
}