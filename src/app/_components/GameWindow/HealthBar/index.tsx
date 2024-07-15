import { Enemy, Player } from "@/app/_types/types"
import styles from "@/styles/components/GameWindow/HealthBar/styles.module.scss"

export default function HealthBar({character}: {character: Player | Enemy}){

    function handleHpBar(){
        if((character.hp / character.maxhp) < 0.3) return "hsl(358, 100%, 50%)"
        else if((character.hp / character.maxhp) < 0.6) return "hsl(30, 100%, 45%)"
    }

    return (
        <div className={styles.healthbar_wrapper}>
            {/* <div id={styles.maxhp}>{character.maxhp}</div> */}
            <div
            id={styles.hp}
            style={{"width":`${(character.hp/character.maxhp)*100}%`, "backgroundColor":handleHpBar()}}></div>
            {
                character.armour > 0 &&
                <div id={styles.armour}></div>
            }
        </div>
    )
}