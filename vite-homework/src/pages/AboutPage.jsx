import styles from "./Pages.module.css";

const AboutPage = () => {
  return (
    <section className={`${styles.page} ${styles.aboutPage}`}>
      <h2 className={styles.title}>about this app</h2>
      <p className={styles.intro}>
        a simple little list to help you stay organized, one task at a time :)
      </p>
      <div className={styles.featuresSection}>
        <h3 className={styles.subtitle}>what you can do</h3>
        <ul className={styles.features}>
          <li>
            <span className={styles.featureIcon}>＋</span>
            <span>create tasks and add descriptions</span>
          </li>
          <li>
            <span className={styles.featureIcon}>✓</span>
            <span>check off completed tasks</span>
          </li>
          <li>
            <span className={styles.featureIcon}>↗</span>
            <span>filter tasks by their status</span>
          </li>
          <li>
            <span className={styles.featureIcon}>✎</span>
            <span>edit or delete tasks anytime</span>
          </li>
        </ul>
      </div>
      <div className={styles.madeWith}>
        <h3 className={styles.madeWithLabel}>made with</h3>
        <p className={styles.text}>
          vite · react · react router · redux toolkit · css modules
        </p>
      </div>
      <div className={styles.authorSection}>
        <h3 className={styles.subtitle}>a little note</h3>
        <p className={styles.text}>
          made as part of my frontend learning journey, with curiosity,
          practice, and a little love for simple things
        </p>
      </div>
      <p className={styles.aboutFooter}>
        one task at a time <span>♡</span>
      </p>
    </section>
  );
};

export default AboutPage;
