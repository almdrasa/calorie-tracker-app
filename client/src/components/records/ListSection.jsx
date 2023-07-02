import { useContext } from "react";
import { RecordList } from "./RecordList";
import styles from "./ListSection.module.css";
import { AppContext } from "@root/AppContext";

export function ListSection(props) {
  const { allRecords } = props;

  const { currentDate, currentDateStr, setCurrentDate } =
    useContext(AppContext);

  const dateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };

  const dateFilter = (record) =>
    record.date.getDate() === currentDate.getDate() &&
    record.date.getMonth() === currentDate.getMonth() &&
    record.date.getFullYear() === currentDate.getFullYear();

  return (
    <>
      <label className={styles["listing-picker-label"]} htmlFor="listingDate">
        Select date
      </label>
      <input
        id="listingDate"
        type="date"
        className={styles["listing-picker-input"]}
        value={currentDateStr}
        onChange={dateChangeHandler}
      />
      <RecordList records={allRecords.filter(dateFilter)} />
    </>
  );
}
