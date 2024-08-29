"use client"

import { useSettings } from "../_components/SettingsContext"
import { audio } from "../assets/sounds"
import useSound from "use-sound"

export default function useAudio() {

    const { volume } = useSettings()

    const [playIntoTheWastes] = useSound(audio.into_the_wastes, {volume: 0.1 * (volume / 100)})
    const [playSelectSound] = useSound(audio.select,{volume: 1 * (volume / 100)})
    const [playHoverSound] = useSound(audio.hover,{volume: 0.6 * (volume / 100)})
    const [playCorrectSound] = useSound(audio.correct,{volume: 1 * (volume / 100)})
    const [playWrongSound] = useSound(audio.wrong,{volume: 1 * (volume / 100)})
    const [playSwingSound] = useSound(audio.attack_sword,{volume: 2 * (volume / 100)})
    const [playHitSound] = useSound(audio.impact_flesh,{volume: 2 * (volume / 100)})
    const [playBlockSound] = useSound(audio.block,{volume: 3 * (volume / 100)})
    const [playHealSound] = useSound(audio.heal,{volume: 3 * (volume / 100)})
    const [playEvadeSound] = useSound(audio.evade,{volume:  1 * (volume / 100)})
    const [playAgilitySound] = useSound(audio.agility,{volume:  1 * (volume / 100)})
    const [playPowerMoveSound] = useSound(audio.power_move,{volume:  1 * (volume / 100)})

    return {
        playIntoTheWastes,
        playSelectSound,
        playHoverSound,
        playCorrectSound,
        playWrongSound,
        playSwingSound,
        playHitSound,
        playBlockSound,
        playHealSound,
        playEvadeSound,
        playAgilitySound,
        playPowerMoveSound
    }
}