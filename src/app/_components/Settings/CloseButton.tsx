import { useSettings } from "../SettingsContext"
import styles from "./styles.module.scss"
import useAudio from "@/app/_hooks/useVolume"

export default function CloseButton(){

    const { setOpen } = useSettings()
    const { playHoverSound, playSelectSound } = useAudio()

    function handleClick() {
        setOpen(prev => !prev)
        playSelectSound()
    }

    return (
        <a
            id={styles.close_settings_button}
            onClick={handleClick}
            onMouseEnter={() => playHoverSound()}
            >
            Close
        </a>
    )
}