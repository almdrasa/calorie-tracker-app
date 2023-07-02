import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ListSection } from "@components/records";
import { Form } from "@components/edit";
import styles from "./TrackPage.module.css";

const LOCAL_STORAGE_KEY = "calorieRecords";

export function TrackPage() {
  const [records, setRecords] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function save() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(records));
  }

  function loadRecords() {
    const storageRecords = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storageRecords != null && storageRecords !== "undefined") {
      setRecords(
        JSON.parse(storageRecords).map((record) => ({
          ...record,
          date: new Date(record.date),
          calories: Number(record.calories),
        }))
      );
    } else {
      setRecords([]);
    }
  }

  useEffect(() => {
    if (!records) {
      loadRecords();
    } else {
      save();
    }
  }, [records]);

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
    const formattedRecord = {
      ...record,
      date: record.date,
      id: crypto.randomUUID(),
    };
    setRecords((prevRecords) => [formattedRecord, ...prevRecords]);

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
      {records && <ListSection allRecords={records} />}
      <button className={styles["open-modal-btn"]} onClick={handleOpenModal}>
        Track food
      </button>
    </div>
  );
}
