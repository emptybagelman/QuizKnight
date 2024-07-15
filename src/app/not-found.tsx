import BackButton from "./_components/BackButton";
import styles from "@/styles/root/home.module.scss"

export default function NotFound(){
    return (
        <div className={styles.main}>
            <div id={styles.not_found_wrapper}>
                <h1>Page Does Not Exist!</h1>
                <p>Click here to return home.</p>
                <BackButton />
            </div>
        </div>
    )
}