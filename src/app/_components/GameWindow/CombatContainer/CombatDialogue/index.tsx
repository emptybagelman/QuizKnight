import styles from "./styles.module.scss"
import { type DialogueProps } from "@/app/_types/types";

export default function CombatDialogue(
    
        {data,extra}
    :
        {data: DialogueProps | undefined, extra: string | undefined}
    ){
    if(!data) return;
    const TEXT = [
        `You hit the ${data.enemy.name}!`, // 0
        `You got hit by the ${data.enemy.name}!`, // 1
        `You uhh, fainted!`, // 2
        `You defeated ${data.enemy.name}!`, // 3
        'Critical Hit!', // 4
        `You blocked the ${data.enemy.name}'s attack!`, // 5
        `${data.enemy.name} blocked your attack!`, // 6
        `${data.enemy.name} died and dropped a ${extra}!` // 7
    ]

    if(data.active == false) return;

    return (
        <div className={styles.dialogue_wrapper}>
            {
                data.index != -1
                ?
                    <p className={
                        data.index != -1
                        ? `${styles.text} ${styles.dialogue_anim}`
                        : styles.text
                        }>
                            {TEXT[data.index]}
                    </p>
                : <p></p>
            }
        </div>
    )
}