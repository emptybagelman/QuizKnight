import { useSettings } from "../../SettingsContext"
import styles from "./styles.module.scss"

export default function GameSpeed(){

    const { gameSpeedMultiplier, setGameSpeedMultiplier } = useSettings()

    function handleVolume(e: React.ChangeEvent<HTMLInputElement>){
        const inputValue = Number(e.target.value)
        setGameSpeedMultiplier(inputValue / 100)
    }

    return (
        <div className={styles.widget_wrapper}>
            <p>Game Speed</p>
            <input 
                type="range" 
                className={styles.range} 
                min={10} 
                max={100} 
                step={10}
                defaultValue={gameSpeedMultiplier * 100} 
                onChange={handleVolume}
            />

            <p className={styles.tally}>{gameSpeedMultiplier}</p>
        </div>
    )
}