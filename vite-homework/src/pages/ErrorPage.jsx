import { useLocation, Link } from "react-router-dom";
import styles from "./Pages.module.css";

const ErrorPage = () => {
  const location = useLocation();

  const message = location.state?.message ?? "something went wrong :(";

  return (
    <section className={styles.page}>
      <h2 className={styles.title}>oops!</h2>
      <p className={styles.welcomeText}>{message}</p>
      <Link to="/" className={styles.primaryLink}>
        back to home
      </Link>
    </section>
  );
};

export default ErrorPage;
