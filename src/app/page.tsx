import styles from "@/styles/root/home.module.scss";
import RedirectButton from "./_components/RedirectButton";
import SettingsButton from "./_components/Settings/MMButton";
import Logo from "./_components/Logo";

export default async function Home() {

  return (
    <main className={styles.main}>
      <div id={styles.home_wrapper}>
        <Logo />

        <RedirectButton route={"play"} text={"Play"}/>
        <RedirectButton route={"scoreboard"} text={"Score"}/>
        <SettingsButton />

      </div>
    </main>
  );
}

