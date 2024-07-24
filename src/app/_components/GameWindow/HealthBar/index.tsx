import { Enemy, Player } from "@/app/_types/types"
import styles from "@/styles/components/GameWindow/HealthBar/styles.module.scss"

export default function HealthBar({character}: {character: Player | Enemy}){

    function handleHpBar(){
        if((character.hp / character.maxhp) < 0.3) {
            return {
                "backgroundColor":"hsl(358, 100%, 45%)",
                "boxShadow": "hsl(358, 100%, 21%) inset 0 -3px 0 0",
                "width":`${(character.hp/character.maxhp)*100}%`
            }
        }
        else if((character.hp / character.maxhp) < 0.6) {
            return {
                "backgroundColor":"hsl(30, 100%, 45%)",
                "boxShadow": "hsl(14, 100%, 39%) inset 0 -3px 0 0",
                "width":`${(character.hp/character.maxhp)*100}%`
            }
        }
    }

    return (
        <div className={styles.healthbar_wrapper}>
            {/* <div id={styles.maxhp}>{character.maxhp}</div> */}
            <div id={styles.hp} style={handleHpBar()}></div>
            <div id={styles.maxhp}></div>
            {
                character.armour > 0 &&
                <div id={styles.armour}>{character.armour}</div>
            }
        </div>
    )
}

// {"width":`${(character.hp/character.maxhp)*100}%`,"backgroundColor":handleHpBar() }