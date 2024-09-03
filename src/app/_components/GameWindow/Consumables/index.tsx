"use client"

import { type PlayerType, type Consumable, type Skill } from "@/app/_types/types"
import { useGame } from "../../GameContext"
import styles from "./styles.module.scss"
import useAudio from "@/app/_hooks/useVolume"
import usePlayer from "@/app/_hooks/usePlayer"

export default function ConsumableContainer({buttonState}:{buttonState: boolean}){

    const { player } = useGame()

    return (
        <div
            className={styles.consumable_wrapper}
            style={buttonState ? 
                {
                    pointerEvents: "none",
                    filter: "brightness(0.5)"
                } : {}}
        >
            {
                player.consumables.map((item: Consumable,index: number) => (
                        item.value ?
                        <ConsumableItem key={item.name + index} item={item} />
                        : ""
                    ))
            }
        </div>
    )
}

function ConsumableItem(
    {
        item
    }:{
        item: Consumable,
    }) {

        const { player, setPlayer } = useGame()
        const { playWrongSound, playHealSound, playManaSound, playAgilitySound, playFirebombSound } = useAudio()
        const { updateLootCharge, updateLoot } = usePlayer()

        function handleClick(){

            let hp = player.hp

            if(item.name === "Health Potion"){
                hp = player.maxhp

                if(player.hp === player.maxhp) {
                    playWrongSound()
                    return;
                };

                playHealSound()
                setPlayer(prev: PlayerType) => ({
   ...prev,
   hp: hp
}))
            }

            if(item.name === "Mana Potion"){
                const mana = player.skills[0]?.charge

                if(mana == 100) {
                    playWrongSound()
                    return;
                };

                playManaSound()

                setPlayer((prev: PlayerType) => {
                    
                    if(!prev.skills) return {
                        ...prev
                    };

                    const updatedSkills = [...prev.skills] as Skill[]
                    const charge = updatedSkills[0]?.charge

                    if(!(typeof charge == "number")) return {
                        ...prev
                    }

                    if(charge >= 100) return {
                        ...prev
                    }
                    
                    updatedSkills[0] = {
                        ...updatedSkills[0]!,
                        charge: 100
                    }

                    return {
                        ...prev,
                        skills: updatedSkills
                    }
                })
            }

            if(item.name === "Agility Crystal"){
                if(player.agility){
                    playWrongSound()
                    return;
                }
                playAgilitySound()
                setPlayer((prev: PlayerType) => ({
                    ...prev,
                    agility: 1
                }))
            }
            if(item.name === "Firebomb"){
                const charge = player.consumables[item.id]?.charge
                if(charge == 0) {
                    playFirebombSound()
                    updateLootCharge(item.name, 10)
                }
                else{
                    playWrongSound()
                }
            }
updateLoot(item.name,-1)
        }


    return (
        <div content={item.name} className={styles.item_container} onClick={handleClick}>
            <p className={styles.item_amount}>{item.value}</p>
            {
                item.charge
                ? <p className={styles.charge_counter}>{item.charge}</p>
                : ""
            }
        </div>
    )
}