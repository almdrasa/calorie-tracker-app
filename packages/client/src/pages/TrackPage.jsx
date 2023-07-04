import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ListSection } from "@components/records";
import { Form } from "@components/edit";
import styles from "./TrackPage.module.css";
import { getDateFromString } from "@root/utils";

const LOCAL_STORAGE_KEY = "calorieRecords";

export function TrackPage() {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function save(record) {
    try {
      const response = await fetch("http://localhost:3000/records", {
        method: "POST",
        body: JSON.stringify({
          r_date: record.date,
          r_meal: record.meal,
          r_food: record.content,
          r_cal: record.calories,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to create new record");
      }
      loadRecords();
    } catch (error) {
      setError(error.message);
    }
  }

  async function loadRecords() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/records");
      console.log(response);
      if (response.status === 404) {
        throw new Error("Data not found");
      }
      if (!response.ok) {
        throw new Error("Unknown error");
      }

      const data = await response.json();
      setRecords(
        data.result.map((record) => ({
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
  }, []);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none", // Remove the border
      padding: "0px", // Remove padding
      borderRadius: "var(--theme-border-radius-smooth)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const formSubmitHandler = (record) => {
    save(record);

    handleCloseModal();
  };

  return (
    <div className="App">
      <h1 className={styles.title}>Calorie Tracker</h1>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Modal"
        style={modalStyles}
      >
        <Form onFormSubmit={formSubmitHandler} onCancel={handleCloseModal} />
      </Modal>
      {records && (
        <ListSection allRecords={records} isLoading={loading} error={error} />
      )}
      <button className={styles["open-modal-btn"]} onClick={handleOpenModal}>
        Track food
      </button>
    </div>
  );
}
