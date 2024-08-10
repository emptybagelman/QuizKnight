import styles from "@/styles/components/GameWindow/CombatDialogue/styles.module.scss"
import { type DialogueProps } from "@/app/_types/types";
import { useGame } from "../../GameContext";

export default function CombatDialogue(
    
        {data}
    :
        {data: DialogueProps}
    ){

        const {player} = useGame()
    
        
    const TEXT = [
        `${player.name} hit the ${data.enemy.name}!`,
        `You got hit by the ${data.enemy.name}!`,
        `${player.name} uhh, fainted!`,
        `You defeated ${data.enemy.name}!`
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