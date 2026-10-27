import styles from "../components/Loader.module.css";

const Loader = ({ label = "loading..." }) => {
  return (
    <div className={styles.loader} role="status" aria-label={label}>
      <div className={styles.dots} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <p>{label}</p>
    </div>
  );
};

export default Loader;
