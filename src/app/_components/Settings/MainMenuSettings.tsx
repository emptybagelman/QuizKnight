import { useSettings } from "../SettingsContext"
import CloseButton from "./CloseButton"
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
            <div className={styles.settings}>
                <a href="/" onClick={handleClick}>Home</a>
                <CloseButton />
                <VolumeSlider />

            </div>
        </div>
    )
}