import useAudio from "@/app/_hooks/useVolume"
import { useSettings } from "../../SettingsContext"
import styles from "./styles.module.scss"

export default function MuteCheckbox(){

    const { mute, setMute } = useSettings()
    const { playSelectSound } = useAudio()

    function handleMute(){
        setMute(prev => !prev)
        playSelectSound()
    }

    return (
        <div className={styles.widget_wrapper}>
            <p>Mute</p>
            <input 
                type="checkbox"
                className={styles.checkbox}
                checked={mute}
                onChange={handleMute}
                content={mute ? "mute" : "unmute"}
            />
        </div>
    )
}