"use client"

import { type PlayerType, type Consumable } from "@/app/_types/types"
import { useGame } from "../../GameContext"
import styles from "./styles.module.scss"
import useAudio from "@/app/_hooks/useVolume"

export default function ConsumableContainer(){

    const { player } = useGame()

    return (
        <div className={styles.consumable_wrapper}>
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
        const { playWrongSound, playHealSound } = useAudio()

        function handleClick(){

            let hp = player.hp

            if(item.name === "Health Potion"){
                hp = player.maxhp

                if(player.hp === player.maxhp) {
                    playWrongSound()
                    return;
                };
            }

            playHealSound()

            setPlayer((prev: PlayerType) => {

                if(!prev.consumables) return {
                    ...prev
                };

                const updatedConsumables = [...prev.consumables] as Consumable[]

                updatedConsumables[item.id] = {
                    ...updatedConsumables[item.id]!,
                    value: item.value - 1
                }

                const newPlayer = {
                    ...prev,
                    hp: hp,
                    consumables: updatedConsumables
                }

                return newPlayer
            })
        }


    return (
        <div content={item.name} className={styles.item_container} onClick={handleClick}>
            {/* <p className={styles.item_name}>{item.name}</p> */}
            <p className={styles.item_amount}>{item.value}</p>
        </div>
    )
}