import styles from "@/styles/components/GameWindow/CombatDialogue/styles.module.scss"
import { type DialogueProps } from "@/app/_types/types";

export default function CombatDialogue(
    
        {data}
    :
        {data: DialogueProps}
    ){
        
    const TEXT = [
        `You hit the ${data.enemy.name}!`,
        `You got hit by the ${data.enemy.name}!`,
        `You uhh, fainted!`,
        `You defeated ${data.enemy.name}!`,
        'Critical Hit!',
        `You blocked the ${data.enemy.name}'s attack!`,
        `${data.enemy.name} blocked your attack!`
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