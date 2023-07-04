import styles from "./TextContent.module.css";

export function TextContent(props) {
  return <div className={styles.placeholder}>{props.value}</div>;
}
