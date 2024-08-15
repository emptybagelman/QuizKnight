import { useGame } from "../../GameContext"
import styles from "./styles.module.scss"

export default function ConsumableContainer(){

    const { player, setPlayer } = useGame()

    return (
        <div className={styles.consumable_wrapper}>
            {
                player.consumables &&
                player.consumables.map((item,index) => (
                    <div key={item.name + index} className={styles.item_container}>
                        <p className={styles.item_name}>{item.name}</p>
                        <p className={styles.item_amount}>{item.value}</p>
                    </div>
                ))
            }
        </div>
    )

}
