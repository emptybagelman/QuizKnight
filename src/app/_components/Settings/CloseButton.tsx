import { useSettings } from "../SettingsContext"
import styles from "./styles.module.scss"
import useAudio from "@/app/_hooks/useVolume"

export default function CloseButton(){

    const { setOpen } = useSettings()
    const { playHoverSound } = useAudio()

    return (
        <button
            id={styles.close_settings_button}
            onClick={() => setOpen(prev => !prev)}
            onMouseEnter={() => playHoverSound()}
            >
            Close
        </button>
    )
}