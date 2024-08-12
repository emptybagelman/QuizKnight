import styles from "./styles.module.scss";
import useSound from "use-sound";
import hover from "#/sounds/hover.mp3";

export default function AttackButton(
    {
        handleClick,
        buttonState,
    }:{
        handleClick:React.MouseEventHandler<HTMLButtonElement>,
        buttonState: boolean
    }) {

    const [playHoverSound] = useSound(hover)


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