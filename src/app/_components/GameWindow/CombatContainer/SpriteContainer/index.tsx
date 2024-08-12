import styles from "./styles.module.scss"

export default function SpriteContainer({children}:{children: React.ReactNode}) {
    return (
        <div id={styles.sprite_layer}>
            {children}
        </div>
    )
}