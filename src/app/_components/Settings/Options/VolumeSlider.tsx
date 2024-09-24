import { useSettings } from "../../SettingsContext"
import styles from "./styles.module.scss"

export default function VolumeSlider(){

    const { volume, setVolume, mute } = useSettings()

    function handleVolume(e: React.ChangeEvent<HTMLInputElement>){
        setVolume(Number(e.target.value))
    }

    return (
        <div className={styles.widget_wrapper}>
            <p>Volume</p>
            <input 
                type="range" 
                className={`${styles.range} ${mute ? styles.disable : ""}`} 
                min={0} 
                max={100} 
                defaultValue={volume} 
                onChange={handleVolume}
            />

            <p className={styles.tally}>{volume}</p>
        </div>
    )
}