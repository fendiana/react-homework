import { Link } from "react-router-dom";
import styles from "./Pages.module.css";
import homeIllustration from "../assets/home-page-note-list.png";

const HomePage = () => {
  return (
    <section className={`${styles.page} ${styles.homePage}`}>
      <h2 className={styles.title}>
        welcome to <br />
        my little to do list
      </h2>
      <p className={styles.homeDescription}>
        keep track of your tasks, add descriptions, and celebrate the little
        things you get done
      </p>
      <img
        className={styles.homeIllustration}
        src={homeIllustration}
        alt="a scrap of paper with a list of notes"
      />
      <Link to="/todo-list" className={styles.primaryLink}>
        let's start
      </Link>
    </section>
  );
};

export default HomePage;
