import { useSettings } from "../../SettingsContext"
import styles from "./styles.module.scss"

export default function DamageNumberCheckbox(){

    const { damageNumbers, setDamageNumbers } = useSettings()

    function handleDamage(e: React.ChangeEvent<HTMLInputElement>){
        setDamageNumbers(prev => !prev)
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

