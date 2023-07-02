import { memo } from "react";
import styles from "./Button.module.css";

export const Button = memo((props) => {
  const { variant, children, ...rest } = props;
  return (
    <button {...rest} className={styles[variant]}>
      {children}
    </button>
  );
});
