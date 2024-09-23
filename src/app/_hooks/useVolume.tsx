"use client"

import { useSettings } from "../_components/SettingsContext"
import { audio } from "../../../public/sounds"
import useSound from "use-sound"

export default function useAudio() {

    const { volume, mute } = useSettings()

    function extraProps(vol?: number){
        return {
            volume: (vol ?? 1)  * (volume / 100),
            soundEnabled: !mute
        }

    }

    const [playIntoTheWastes] = useSound(audio.into_the_wastes, extraProps(0.1))
    const [playSelectSound] = useSound(audio.select,extraProps())
    const [playHoverSound] = useSound(audio.hover,extraProps(0.6))
    const [playCorrectSound] = useSound(audio.correct,extraProps())
    const [playWrongSound] = useSound(audio.wrong,extraProps())
    const [playSwingSound] = useSound(audio.attack_sword,extraProps())
    const [playHitSound] = useSound(audio.impact_flesh,extraProps())
    const [playBlockSound] = useSound(audio.block,extraProps(2))
    const [playHealSound] = useSound(audio.heal,extraProps(2))
    const [playEvadeSound] = useSound(audio.evade,extraProps())
    const [playAgilitySound] = useSound(audio.agility,extraProps())
    const [playManaSound] = useSound(audio.power_move,extraProps())
    const [playPowerMoveSound] = useSound(audio.powermove,extraProps())
    const [playChargeSound] = useSound(audio.charge,extraProps(0.2))
    const [playFirebombSound] = useSound(audio.firebomb,extraProps())
    const [playHitImpactSound] = useSound(audio.hit_impact,extraProps())
    const [playPlayerHitSound] = useSound(audio.player_hit,extraProps())
    const [playGoblinHitSound] = useSound(audio.goblin_hit,extraProps())
    const [playMushroomHitSound] = useSound(audio.mushroom_hit,extraProps())
    const [playSkeletonHitSound] = useSound(audio.skeleton_hit,extraProps())
    const [playBossDeathSound] = useSound(audio.boss_death,extraProps())
    const [playExtinguishSound] = useSound(audio.extinguish, extraProps())
    const [playSlimeHitSound] = useSound(audio.slime_hit,extraProps(0.6))

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
        playManaSound,
        playPowerMoveSound,
        playChargeSound,
        playFirebombSound,
        playHitImpactSound,
        playPlayerHitSound,
        playGoblinHitSound,
        playMushroomHitSound,
        playSkeletonHitSound,
        playBossDeathSound,
        playExtinguishSound,
        playSlimeHitSound
    }
}