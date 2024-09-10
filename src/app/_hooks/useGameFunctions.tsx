"use client"

import { useGame } from "../_components/GameContext"
import { type PlayerType, type Consumable, type ConsumableNames } from "../_types/types"

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

    function removeConsumable(name: ConsumableNames){
        const item: Consumable = player.consumables.filter((x) => x.name === name)[0]!

        const consumables = [...player.consumables]

        if(item.value == 1) {

            const updatedConsumables = consumables.filter((x) => x.id != item.id )

            setPlayer((prev: PlayerType) => ({
                ...prev,
                consumables: [...updatedConsumables]
            }))
        }
        else{
            setPlayer((prev: PlayerType) => {
                const updatedConsumables = [...prev.consumables];
                const itemIndex = updatedConsumables.indexOf(item)

                // validity check
                if(!item) return prev;
                if(itemIndex === undefined) return prev;
                if(!updatedConsumables[itemIndex]) return prev;
    
                // increment / decrement value
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

    return {
        addConsumable,
        removeConsumable
    }
}