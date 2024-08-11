import styles from "@/styles/components/GameWindow/Hit/styles.module.scss";

export default function Hit({dmg_value, parryBool}: {dmg_value: number, parryBool?: boolean}) {

    return (
        <div className={parryBool ? styles.block : styles.hit}>
            {dmg_value}
        </div>
    )
}