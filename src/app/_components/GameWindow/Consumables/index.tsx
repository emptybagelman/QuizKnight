"use client"

import { type PlayerType, type Consumable, type Skill } from "@/app/_types/types"
import { useGame } from "../../GameContext"
import styles from "./styles.module.scss"
import useAudio from "@/app/_hooks/useVolume"
import usePlayer from "@/app/_hooks/usePlayer"
import { useState } from "react"
import useGameFunctions from "@/app/_hooks/useGameFunctions"
import { getItemIndex } from "@/app/_functions/game_functions"

const BAG_MINIMUM = 3

export default function ConsumableContainer({buttonState}:{buttonState: boolean}){

    const { player } = useGame()

    const [bagOpen, setBagOpen] = useState<boolean>(false)

    function handleBagClick(){
        if(player.consumables.length >= BAG_MINIMUM){
        setBagOpen(prev => !prev)
    }}
    

    return (
        <a
            className={player.consumables.length >= BAG_MINIMUM ? styles.bag_wrapper : styles.consumable_wrapper}
            style={buttonState ? 
                {
                    pointerEvents: "none",
                    filter: "brightness(0.5)"
                } : {}}
                onClick={handleBagClick}
        >
            {
                player.consumables.map((item: Consumable,index: number) => (
                        item.value > 0 || (item.charge != undefined && item.charge > 0 ) ?
                        <ConsumableItem key={item.name + index} item={item} bagOpen={bagOpen} setBagOpen={setBagOpen} />
                        : ""
                    ))
            }
        </a>
    )
}

function ConsumableItem(
    {
        item,
        bagOpen,
        setBagOpen
    }:{
        item: Consumable,
        bagOpen: boolean,
        setBagOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) {

        const { player, setPlayer } = useGame()
        const { playBlockSound, playWrongSound, playHealSound, playManaSound, playAgilitySound, playFirebombSound } = useAudio()
        const { updateLootCharge } = usePlayer()
        const { removeConsumable } = useGameFunctions()

        function handleClick(){

            let hp = player.hp
            const itemIndex = getItemIndex(item, player)

            if(item.name === "Health Potion"){
                hp = player.maxhp

                if(player.hp === player.maxhp) {
                    playWrongSound()
                    return;
                };

                playHealSound()
                setPlayer((prev: PlayerType) => ({
                ...prev,
                hp: hp
                }))
            }

            if(item.name === "Mana Potion"){
                const mana = player.skills[0]?.charge

                if(mana == 100 || !player.skills[0]?.active) {
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
                const charge = player.consumables[itemIndex]?.charge
                if(charge == 0) {
                    playFirebombSound()
                    updateLootCharge(item, 10)
                }
                else{
                    playWrongSound()
                }
            }
            if(item.name === "Armour Plating"){
                playBlockSound()
                setPlayer((prev) => ({
                    ...prev,
                    armour: prev.armour + 3
                }))
            }
            setBagOpen(false)
            // updateLoot(item.name,-1)
            removeConsumable(item.name, false)
        }


    return (
        <div 
            content={item.name}
            className={styles.item_container}
            onClick={handleClick}
            style={
                bagOpen && player.consumables.length >= BAG_MINIMUM
                ? {
                    transform:`translateX(calc(60px * ${getItemIndex(item, player) + 1}))`,
                    opacity:"1",
                    pointerEvents:"auto"
                }: {}}
        >
            {
                item.value > 0 && 
                <p className={styles.item_amount}>{item.value}</p>
            }
            {
                item.charge && item.charge > 0
                ? <p className={styles.charge_counter}>{item.charge}</p>
                : ""
            }
        </div>
    )
}