import { useState, useEffect } from "react";
import { getDateFromString } from "@utils";

export function useLoadData(apiUrl, dataType = "multiple") {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadRecords() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(apiUrl);
      if (response.status === 404) {
        throw new Error("Data not found");
      }
      if (!response.ok) {
        throw new Error("Unknown error");
      }

      const data = await response.json();
      const result = dataType === "single" ? [data] : data.result;
      setRecords(
        result.map((record) => ({
          id: record.id,
          date: getDateFromString(record.r_date),
          meal: record.r_meal,
          content: record.r_food,
          calories: record.r_cal,
        }))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecords();
  }, [apiUrl]);

  return [
    dataType === "single" ? records[0] : records,
    loading,
    error,
    loadRecords,
  ];
}
