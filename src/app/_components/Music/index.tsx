"use client"


import { audio } from "@/app/assets/sounds"
import useSound from "use-sound"
import { useSettings } from "../SettingsContext"
import styles from "./styles.module.scss"

export default function Music({children}:{children: React.ReactNode}) {

    const { volume } = useSettings()
    const [playIntoTheWastes, {pause}] = useSound(audio.into_the_wastes,{volume: 0.1 * (volume / 100), interrupt: true})
    

    return <div id={styles.music_wrapper} onMouseEnter={() => playIntoTheWastes()} onMouseLeave={()=>pause()}>{children}</div>
}