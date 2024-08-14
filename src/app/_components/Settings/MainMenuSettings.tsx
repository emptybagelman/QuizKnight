import RedirectButton from "../RedirectButton"
import { useSettings } from "../SettingsContext"
import CloseButton from "./CloseButton"
import VolumeSlider from "./Options/VolumeSlider"
import styles from "./styles.module.scss"

export default function MainMenuSettings() {

    const { setOpen } = useSettings()



    return (
        <div className={styles.main_menu_wrapper}>
            <div className={styles.settings}>
                <a href="/" onClick={() => setOpen(prev => !prev)}>Home</a>
                <CloseButton />
                <VolumeSlider />

            </div>
        </div>
    )
}