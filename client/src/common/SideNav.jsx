import { NavLink } from "react-router-dom";
import styles from "./SideNav.module.css";

export function SideNav() {
  return (
    <nav className={styles.nav}>
      <h1 className={styles.title}>Calorie Tracker</h1>
      <NavLink
        to=""
        className={({ isActive }) => (isActive ? styles.active : undefined)}
        end
      >
        Home
      </NavLink>
      <NavLink
        to="track"
        className={({ isActive }) => (isActive ? styles.active : undefined)}
      >
        Track
      </NavLink>
    </nav>
  );
}
