import useAudio from "@/app/_hooks/useVolume"
import { useSettings } from "../../SettingsContext"
import styles from "./styles.module.scss"

export default function DamageNumberCheckbox(){

    const { damageNumbers, setDamageNumbers } = useSettings()
    const { playSelectSound } = useAudio()

    function handleDamage(){
        setDamageNumbers(prev => !prev)
        playSelectSound()
    }

    return (
        <div className={styles.widget_wrapper}>
            <p>Rounded Numbers</p>
            <input 
                type="checkbox"
                className={styles.checkbox}
                checked={damageNumbers}
                onChange={handleDamage}
            />
        </div>
    )

}