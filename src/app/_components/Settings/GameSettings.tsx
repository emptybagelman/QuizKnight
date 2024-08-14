"use client"

import useAudio from "@/app/_hooks/useVolume"
import { useSettings } from "../SettingsContext"
import styles from "./styles.module.scss"
import MainMenuSettings from "./MainMenuSettings"
import { SettingsIcon } from "../Icons"

export default function SettingsWidget(){
    const { open, setOpen } = useSettings()
    const { playHoverSound, playSelectSound } = useAudio()

    return (
        <>
            <p
                className={styles.settings_icon}
                onMouseEnter={() => playHoverSound()}
                onClick={() => {setOpen(prev => !prev);playSelectSound()}}
            >
                <SettingsIcon />
            </p>
            {
                open &&
                <MainMenuSettings />
            }
        </>
    )
}