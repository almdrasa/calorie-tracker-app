import { useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { getDateFromString } from "@root/utils";
import { useEffect, useState } from "react";
import { TextContent } from "@root/common";

export function DetailPage() {
  const params = useParams();
  const [detail, setDetail] = useState();
  const [error, setError] = useState();

  async function loadDetails(id) {
    try {
      const response = await fetch(`http://localhost:3000/records/${id}`);
      if (!response.ok) {
        throw new Error("Failed to load record details");
      }
      const data = await response.json();
      setDetail({
        date: getDateFromString(data.r_date).toLocaleDateString(),
        meal: data.r_meal,
        content: data.r_food,
        calories: data.r_cal,
      });
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    loadDetails(params.recordId);
  }, []);

  return error ? (
    <TextContent value={error} />
  ) : (
    detail && (
      <div className={styles.container}>
        <div className={styles.item}>
          <p>Date:</p>
          <p>{detail.date}</p>
        </div>
        <div className={styles.item}>
          <p>Meal:</p>
          <p>{detail.meal}</p>
        </div>
        <div className={styles.item}>
          <p>Content:</p>
          <p>{detail.content}</p>
        </div>
        <div className={styles.item}>
          <p>Calories:</p>
          <p>{detail.calories}</p>
        </div>
      </div>
    )
  );
}
