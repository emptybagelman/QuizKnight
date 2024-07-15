import { LoadingSpinner } from "@/app/_components/Icons"
import styles from "@/styles/root/home.module.scss"

export default function Loading(){
    return (
        <main id={styles.main}>
            <LoadingSpinner />
        </main>
    )
}