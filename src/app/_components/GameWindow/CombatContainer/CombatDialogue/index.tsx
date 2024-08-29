"use client"

import styles from "./styles.module.scss"
import { type DialogueProps } from "@/app/_types/types";
import Typewriter from "./typewriter";

export default function CombatDialogue(
    
        {data,extra}
    :
        {data: DialogueProps | undefined, extra: string | undefined}
    ){

    if(!data) return;
    const TEXT = [
        `You hit the ${data.enemy.name}.`, // 0
        `You got hit by the ${data.enemy.name}.`, // 1
        `You uhh, fainted!`, // 2
        `You defeated the ${data.enemy.name}.`, // 3
        'Critical Hit!', // 4
        `You blocked the ${data.enemy.name}'s attack!`, // 5
        `The ${data.enemy.name} blocked your attack!`, // 6
        `The ${data.enemy.name} died and dropped a ${extra}.`, // 7
        `${data.enemy.name} missed!` // 8
    ]

    if(data.active == false) return;


    return (
        <div className={styles.dialogue_wrapper}>
            {
                data.index != -1
                ?   
                <Typewriter text={TEXT[data.index]}/>

                : <p></p>
            }
        </div>
    )
}