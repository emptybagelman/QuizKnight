import useAudio from "@/app/_hooks/useVolume";
import styles from "./styles.module.scss";

export default function AttackButton(
    {
        handleClick,
        buttonState,
    }:{
        handleClick:React.MouseEventHandler<HTMLButtonElement>,
        buttonState: boolean
    }) {

    const { playHoverSound } = useAudio()


    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => playHoverSound()}
            className={styles.attack_button}
            disabled={buttonState}
            >
                Attack
        </button>
    )
}