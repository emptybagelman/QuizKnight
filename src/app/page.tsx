import styles from "@/styles/root/home.module.scss";
import logo from "@/app/assets/logo.png"
import Image from "next/image";
import RedirectButton from "./_components/RedirectButton";

export default async function Home() {

  return (
    <main className={styles.main}>
      <div id={styles.home_wrapper}>
        <Image id={styles.logo_image} src={logo} alt="GeoKnight" />
        <p>Find your adventure.</p>

        <div>
          <RedirectButton route={"play"} text={"Play"}/>
          <RedirectButton route={"scoreboard"} text={"Score"}/>
        </div>

      </div>
    </main>
  );
}
