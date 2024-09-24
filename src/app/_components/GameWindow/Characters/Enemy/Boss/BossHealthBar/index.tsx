"use client"

import { type Enemy } from "@/app/_types/types"
import styles from "./styles.module.scss"

export function BossHealthBar({boss}:{boss: Enemy}) {


    function handleHpBar(){
        if(!boss) return;
        if((boss.hp / boss.maxhp) <= 0) {
            return {
                "width":"0%",
                "backgroundColor":"transparent",
                "boxShadow": "transparent inset 0 0 "
            }
        }
        if((boss.hp / boss.maxhp) < 0.3) {
            return {
                "backgroundColor":"hsl(358, 100%, 45%)",
                "boxShadow": "hsl(358, 100%, 21%) inset 0 -3px 0 0",
                "width":`${(boss.hp/boss.maxhp)*100}%`
            }
        }
        else if((boss.hp / boss.maxhp) < 0.6) {
            return {
                "backgroundColor":"hsl(30, 100%, 45%)",
                "boxShadow": "hsl(14, 100%, 39%) inset 0 -3px 0 0",
                "width":`${(boss.hp/boss.maxhp)*100}%`
            }
        }
        else{
            return {
                "width":`${(boss.hp/boss.maxhp)*100}%`
            }
        }
    }

    return (
        <div className={styles.boss_healthbar_wrapper}>
            <div id={styles.hp} style={handleHpBar()}></div>
            <div id={styles.maxhp}></div>
            <h1 id={styles.bossname}>{boss.name}</h1>
        </div>
    )
}