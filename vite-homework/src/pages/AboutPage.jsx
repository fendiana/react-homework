import styles from "./Pages.module.css";

const AboutPage = () => {
  return (
    <section className={styles.page}>
      <h2 className={styles.title}>about this app</h2>
      <p className={styles.text}>
        this is a simple to do list to help you organize your tasks in one place
      </p>
      <h3 className={styles.subtitle}>features</h3>
      <ul className={styles.features}>
        <li>create tasks and add descriptions</li>
        <li>mark tasks as completed</li>
        <li>filter active and completed tasks</li>
        <li>edit and delete tasks</li>
      </ul>
      <h3 className={styles.subtitle}>made with</h3>
      <p className={styles.text}>
        react, react router, json-server, and css modules
      </p>
      <h3 className={styles.subtitle}>about the author</h3>
      <p className={styles.text}>
        this project was created as part of a frontend learning journey to
        practice react, routing, components, and working with an api
      </p>
    </section>
  );
};

export default AboutPage;
