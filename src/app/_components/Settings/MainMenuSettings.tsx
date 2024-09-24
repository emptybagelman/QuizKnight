import { useSettings } from "../SettingsContext"
import CloseButton from "./CloseButton"
import DamageNumberCheckbox from "./Options/DamageNumbers"
import GameSpeed from "./Options/GameSpeed"
import MuteCheckbox from "./Options/Mute"
import VolumeSlider from "./Options/VolumeSlider"
import styles from "./styles.module.scss"
import useAudio from "@/app/_hooks/useVolume"

export default function MainMenuSettings() {

    const { setOpen } = useSettings()
    const { playSelectSound } = useAudio()

    function handleClick(){
        setOpen(prev => !prev)
        playSelectSound()
    }

    return (
        <div className={styles.main_menu_wrapper}>
            {/* <div className={styles.settings}> */}
                <div className={styles.buttons}>
                    <a id={styles.home_button} href="/" onClick={handleClick}>Home</a>
                    <CloseButton />
                </div>
                <VolumeSlider />
                <MuteCheckbox />
                <DamageNumberCheckbox />
                <GameSpeed />
            {/* </div> */}
        </div>
    )
}