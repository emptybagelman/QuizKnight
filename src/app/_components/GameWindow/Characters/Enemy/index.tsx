import { type Enemy } from "@/app/_types/types"
import { resolveAnimType } from "../../CombatContainer/Combat/sprites"
import HealthBar from "../HealthBar"
import Hit from "../Hit"

export default function EnemySprite(
    {
        id,
        enemy,
        enemyData,
        enemyAttack,
        playerAttack,
        damage,

    }:{
        id: number,
        enemy: Enemy,
        enemyData: Enemy[],
        enemyAttack: boolean,
        playerAttack: boolean,
        damage: number,
    }) {

    return (
        <div
            key={id}
            className={enemyData[0] && resolveAnimType(enemy, enemyData, enemyAttack, playerAttack)}>
            {
                playerAttack && enemyData[0]?.id === enemy.id
                ? <Hit dmg_value={damage}/>
                : ""
            }
            <HealthBar character={enemy} />
        </div>
    )
}