import { useContext, useEffect } from "react";

import styles from "./Record.module.css";
import { StyledRecordCell } from "@common";
import { AppContext } from "@root/AppContext";
import { Button } from "@root/common";

export function Record(props) {
  const { setTotalCalories: addCalories } = useContext(AppContext);

  if (props.calories < 0) {
    return null;
  }

  useEffect(() => {
    addCalories((prevTotal) => prevTotal + props.calories);

    return () => {
      addCalories((prevTotal) => prevTotal - props.calories);
    };
  }, []);

  const deleteHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:3000/records/${props.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      props.refresh?.();
    }
  };

  return (
    <ul className={styles.record}>
      <li>{props.meal}</li>
      <li>{props.content}</li>
      <li className={styles["record-calories"]}>
        <StyledRecordCell>{props.calories}</StyledRecordCell>
      </li>
      <Button variant="secondary" onClick={deleteHandler}>
        Delete
      </Button>
    </ul>
  );
}
