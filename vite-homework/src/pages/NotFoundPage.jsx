import { Link } from "react-router-dom";
import styles from "./Pages.module.css";

const NotFoundPage = () => {
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>404 - page not found</h2>
      <p className={styles.welcomeText}>
        looks like this page doesn't exist :|
      </p>
      <Link to="/" className={styles.primaryLink}>
        back to home
      </Link>
    </section>
  );
};

export default NotFoundPage;
