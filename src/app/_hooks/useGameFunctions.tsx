"use client"

import { useGame } from "../_components/GameContext"
import { type PlayerType, type Consumable, type ConsumableNames, type CharacterNames } from "../_types/types"
import { useEffect } from "react"
import useAudio from "./useVolume"

const consumables: Consumable[] = [
    {
        id: 0,
        name: "Health Potion",
        value: 1,
        description: "Fills your HP to full."
    },
    {
        id: 1,
        name: "Mana Potion",
        value: 1,
        description: "Charge your power move to the max!"
    },
    {
        id: 2,
        name: "Agility Crystal",
        value: 1,
        description: "Dodge the enemy's next attack."
    },
    {
        id: 3,
        name: "Firebomb",
        value: 1,
        description: "Burns enemies over time.",
        charge: 0,
    }
]

export default function useGameFunctions(){

    const { player, setPlayer } = useGame()
    const { playPlayerHitSound, playGoblinHitSound, playMushroomHitSound, playSkeletonHitSound, playBossDeathSound } = useAudio()

    function getHitSound(name: CharacterNames){
        switch(name){
            case "Player":
                playPlayerHitSound()
                break;
            case "Goblin":
                playGoblinHitSound()
                break;
            case "Mushroom":
                playMushroomHitSound()
                break;
            case "Skeleton":
                playSkeletonHitSound()
                break;
            default:
                playMushroomHitSound()
                break;
        }
    }

    function getDeathSound(name: CharacterNames){
        switch(name){
            case "Player":
                playPlayerHitSound()
                break;
            case "Demon Slime":
                playBossDeathSound()
                break;
            default:
                break;
        }
    }

    function getConsumable(name: ConsumableNames){
        const item: Consumable = consumables.filter((x) => x.name == name)[0]!
        return item
    }

    function addConsumable(name: ConsumableNames){
        const item: Consumable = player.consumables.filter((x) => x.name === name)[0]!
        const consItem: Consumable = consumables.filter((x) => x.name == name)[0]!

        if(!item){

            const newConsumableArray = [...player.consumables]
            newConsumableArray.push(consItem)

            setPlayer((prev: PlayerType) => ({
                ...prev,
                consumables: [...newConsumableArray]
            }))
        }
        else if(player.consumables[item.id]){
            setPlayer((prev: PlayerType) => {
                const updatedConsumables = [...prev.consumables];
    
                // get id of Consumable from player.consumables
                const itemId = updatedConsumables.filter((i: Consumable) => i.name === item.name)[0]?.id
    
                if(itemId === undefined) return prev;
    
                // validity check
                if(!updatedConsumables[itemId]) return prev;
    
    
                // increment / decrement value
                updatedConsumables[itemId] = {
                    ...updatedConsumables[itemId],
                    value: updatedConsumables[itemId].value + 1
                };
                return {
                    ...prev,
                    consumables: updatedConsumables
                }
            })
        }
    }

    function removeConsumable(name: ConsumableNames, destroy: boolean){
        const item: Consumable = player.consumables.filter((x) => x.name === name)[0]!
        const consumables = [...player.consumables]

        // pop from consumable array
        if(item.value <= 1 && destroy) {
            const updatedConsumables = consumables.filter((x) => x.id != item.id )

            setPlayer((prev: PlayerType) => ({
                ...prev,
                consumables: [...updatedConsumables]
            }))
        }

        // decrease consumable value
        else{
            setPlayer((prev: PlayerType) => {
                const updatedConsumables = [...prev.consumables];
                const itemIndex = updatedConsumables.map(x => x.name).indexOf(item.name)

                // validity check
                if(!item) return prev;
                if(itemIndex === undefined) return prev;
                if(!updatedConsumables[itemIndex]) return prev;
    

                updatedConsumables[itemIndex] = {
                    ...updatedConsumables[itemIndex],
                    value: updatedConsumables[itemIndex].value - 1
                };

                return {
                    ...prev,
                    consumables: updatedConsumables
                }
            })
        }
    }

    useEffect(() => {
        function watchConsumableCharge(){
            const itemsWithCharge = [...player.consumables].filter((item: Consumable) => typeof item.charge === "number")
            
            for(const item of itemsWithCharge ){
                if(item.charge && item.charge <= 0 && item.value < 1){
                    removeConsumable(item.name, true)
                }
            }
        }
        watchConsumableCharge()
    },[ player.consumables ])

    return {
        addConsumable,
        removeConsumable,
        getHitSound,
        getDeathSound,
        getConsumable
    }
}