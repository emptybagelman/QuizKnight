"use client"

import useAudio from "@/app/_hooks/useVolume"
import styles from "./styles.module.scss"
import { type Consumable } from "@/app/_types/types"
import health_potion from "#/items/health_potion.png"
import mana_potion from "#/items/mana_potion.png"
import firebomb from "#/items/firebomb.png"
import agility_crystal from "#/items/agility_crystal.png"

export default function DropScreen({item, setToggleOpen}:{item: Consumable | undefined, setToggleOpen: React.Dispatch<React.SetStateAction<boolean>>}){

    const { playHoverSound, playCorrectSound } = useAudio()

    function handleClick(){
        setToggleOpen(false)
        playCorrectSound()
    }

    function getImage(){
        switch(item?.name){
            case "Health Potion":
                console.log("hppot");
                return health_potion
            case "Mana Potion":
                console.log("hppot");
                return mana_potion
            case "Agility Crystal":
                console.log("hppot");
                return agility_crystal
            case "Firebomb":
                console.log("hppot");
                return firebomb
            default:
                return health_potion
        }
    }

    if(item)
    return (
        <div className={styles.drop_screen_wrapper}>
            <h2>New!</h2>
            <h1>{item.name}</h1>
            <div 
                className={styles.item_image}
                style={item.name ? {backgroundImage:`url("${getImage().src}")`} : {}}
            ></div>

            <p>{item.description}</p>

            <a
                className={styles.continue}
                onMouseOver={() => playHoverSound()}
                onClick={handleClick}
            
            >Continue</a>
        </div>
    )
}