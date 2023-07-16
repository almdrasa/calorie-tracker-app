import {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef,
  useCallback,
  useMemo,
} from "react";
import styles from "./EditPage.module.css";
import { AppContext } from "@root/AppContext";
import { FormInput, Button } from "@common";
import { useNavigate } from "react-router-dom";

const DEFAULT_VALUE = {
  meal: true,
  content: false,
  calories: true,
};

function formReducer(state, action) {
  const { key, value, auxValue } = action;

  let valid;
  switch (key) {
    case "content":
      valid =
        (value === "sport" && auxValue < 0) ||
        (value !== "sport" && auxValue >= 0);
      return {
        ...state,
        content: !!value,
        calories: valid,
      };
    case "calories":
      valid =
        (auxValue === "sport" && value < 0) ||
        (auxValue !== "sport" && value >= 0);
      return {
        ...state,
        calories: valid,
      };
    default:
      return {
        ...state,
        meal: !!value,
      };
  }
}

export function EditPage() {
  const { isValidDate, currentDateStr, setCurrentDate, totalCalories } =
    useContext(AppContext);
  const [formState, dispatchFn] = useReducer(formReducer, DEFAULT_VALUE);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const contentRef = useRef();
  const caloriesRef = useRef();
  const mealRef = useRef();

  const { content: isContentValid, calories: isCaloriesValid } = formState;

  async function save(record) {
    setError(null);
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
      navigate("..");
    } catch (error) {
      setError(error.message);
    }
  }

  const isFormValid = useMemo(() => {
    return isValidDate && isContentValid && isCaloriesValid;
  }, [isValidDate, isContentValid, isCaloriesValid]);

  useEffect(() => {
    if (!isContentValid) {
      contentRef.current.focus();
    }
  }, [isContentValid]);

  const onDateChangeHandler = (event) => {
    setCurrentDate(event.target.value);
  };

  const onMealBlurHandler = (event) => {
    dispatchFn({
      key: "meal",
      value: event.target.value,
    });
  };
  const onContentBlurHandler = (event) => {
    dispatchFn({
      key: "content",
      value: event.target.value,
      auxValue: Number(caloriesRef.current.value),
    });
  };
  const onCalorieBlurHandler = (event) => {
    dispatchFn({
      key: "calories",
      value: Number(event.target.value),
      auxValue: contentRef.current.value,
    });
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // {date: {value: '01-03-2021', valid: false}, meal: ...}
    // {date: '01-03-2021', meal: 'Breakfast', ...}
    save({
      date: currentDateStr,
      meal: mealRef.current.value,
      content: contentRef.current.value,
      calories: Number(caloriesRef.current.value),
    });
  };

  const onCancelHandler = useCallback(() => {
    navigate("..");
  }, []);

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      {error && <p className={styles.warning}>Request failed, {error}</p>}
      <FormInput
        type="date"
        value={currentDateStr}
        id="date"
        label="Date"
        onChange={onDateChangeHandler}
        isValid={isValidDate}
      />
      <FormInput
        label="Meal"
        id="meal"
        onBlur={onMealBlurHandler}
        ref={mealRef}
        type="select"
        isValid
      >
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
        <option value="Snack">Snack</option>
      </FormInput>
      <FormInput
        type="text"
        label="Content"
        id="content"
        onBlur={onContentBlurHandler}
        isValid={isContentValid}
        ref={contentRef}
      />
      <FormInput
        type="number"
        label="Calories"
        id="calories"
        onBlur={onCalorieBlurHandler}
        isValid={isCaloriesValid}
        ref={caloriesRef}
      />
      <div className={styles.footer}>
        <Button variant="primary" disabled={!isFormValid}>
          Add Record
        </Button>
        <Button variant="secondary" type="button" onClick={onCancelHandler}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
