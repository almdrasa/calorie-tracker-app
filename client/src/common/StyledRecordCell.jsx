import styles from "./StyledRecordCell.module.css";

export function StyledRecordCell(props) {
  return <div className={styles["styled-record-cell"]}>{props.children}</div>;
}
