import { NavLink, Outlet } from "react-router-dom";
import styles from "../layouts/Layout.module.css";

const Layout = () => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <nav className={styles.navigation}>
          <NavLink to="/" end className={getNavLinkClass}>
            home
          </NavLink>
          <NavLink to="/todo-list" className={getNavLinkClass}>
            to do list
          </NavLink>
          <NavLink to="/about" end className={getNavLinkClass}>
            about
          </NavLink>
        </nav>
      </header>
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
