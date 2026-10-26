import { Link } from "react-router-dom";
import styles from "./Pages.module.css";

const HomePage = () => {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>
        welcome to <br />
        my little to do list
      </h1>
      <p className={styles.welcomeText}>
        keep track of your tasks, add descriptions, mark completed tasks, and
        stay organized
      </p>
      <p className={styles.welcomeText}>
        a little list to make your day feel easier :)
      </p>
      <Link to="/todo-list" className={styles.primaryLink}>
        let's start
      </Link>
    </section>
  );
};

export default HomePage;
