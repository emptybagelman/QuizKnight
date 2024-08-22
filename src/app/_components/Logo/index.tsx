import styles from "./styles.module.scss"

export default function Logo(){
    return (
        <h1 id={styles.logo}>
            <span id={styles.quiz}>Quiz<div id={styles.logo_img}></div></span>
            <span id={styles.knight}>Knight</span>
        </h1>
    )
}