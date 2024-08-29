import { LoadingSpinner } from "../_components/Icons";
import styles from "@/styles/root/play/play.module.scss"
export default function Loading(){

    return (
        <div className={styles.loading}>
            <LoadingSpinner />
        </div>
    )
}