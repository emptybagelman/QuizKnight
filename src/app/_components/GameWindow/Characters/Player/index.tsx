import { useCombat } from "../../../CombatContext"
import { useGame } from "../../../GameContext"
import { playerAnims } from "../../CombatContainer/Combat/sprites"
import HealthBar from "../HealthBar"
import Hit from "../Hit"

export default function Player({parryBool}:{parryBool: boolean}){

    const { player } = useGame()
    const { enemyAttack, playerAttack, enemyData } = useCombat()

    return (
        <div className={player && playerAnims(player, enemyAttack, playerAttack)}>
            {
                enemyAttack && enemyData[0]
                ? <Hit dmg_value={enemyData[0].dmg} parryBool={parryBool}/>
                : ""
            }
            <HealthBar character={player} />
        </div>
    )
}