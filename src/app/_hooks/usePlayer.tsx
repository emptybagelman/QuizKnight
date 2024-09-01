"use client"

import { useGame } from "../_components/GameContext"
import { type Consumable, type Skill, type PlayerType } from "../_types/types"

type Increment = 1 | -1

export default function usePlayer(){

    const { setPlayer } = useGame()

    function setMaxHp(){
        setPlayer((prev: PlayerType) => ({
            ...prev,
            hp: prev.maxhp,
        }))
    }

    function updatePlayerStat(stat: string, increment: Increment, extra?: number | string ){
        if(typeof extra == "number"){
            if(stat === "hp"){
                setPlayer((prev: PlayerType) => ({
                    ...prev,
                    maxhp: prev.maxhp + (prev.maxhp * (extra ? (extra / 100) : 1))
                }))
            }
            else{
                setPlayer((prev: PlayerType) => ({
                    ...prev,
                    [stat]: Number(prev[stat as keyof PlayerType]) + (Number(prev[stat as keyof PlayerType]) * increment * (extra ? (extra / 100) : 1)) 
                }))
            }
        }
    }

    function updateLoot(item: string, increment: Increment){
        setPlayer((prev: PlayerType) => {
            const updatedConsumables = [...prev.consumables];

            // get id of Consumable from player.consumables
            const itemId = updatedConsumables.filter((i: Consumable) => i.name === item)[0]?.id

            if(itemId === undefined) return prev;

            // validity check
            if(!updatedConsumables[itemId]) return prev;

            if(itemId === 2) {
                if(updatedConsumables[itemId].value >= 1) return prev;
            }

            // increment / decrement value
            updatedConsumables[itemId] = {
                ...updatedConsumables[itemId],
                value: updatedConsumables[itemId].value + increment
            };
            return {
                ...prev,
                consumables: updatedConsumables
            }
        })
    }

    function updateSkills(skillID: number,increment: number, reset?: boolean){
        setPlayer((prev: PlayerType) => {
            if(!prev.skills) return {
                ...prev
            };

            const updatedSkills = [...prev.skills] as Skill[]
            const charge = updatedSkills[skillID]?.charge

            if(!(typeof charge == "number")) return {
                ...prev
            }


            if(charge >= 100 && !reset) return {
                ...prev
            }
            
            updatedSkills[skillID] = {
                ...updatedSkills[skillID]!,
                charge: increment
            }

            return {
                ...prev,
                skills: updatedSkills
            }
        })
    }

    return {
        updatePlayerStat,
        setMaxHp,
        updateSkills,
        updateLoot
    }

}