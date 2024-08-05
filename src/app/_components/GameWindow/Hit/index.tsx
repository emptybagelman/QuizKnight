import styles from "@/styles/components/GameWindow/Hit/styles.module.scss";

export default function Hit({dmg_value}: {dmg_value: number}) {

    return (
        <div className={styles.hit}>
            {dmg_value}
        </div>
    )
}