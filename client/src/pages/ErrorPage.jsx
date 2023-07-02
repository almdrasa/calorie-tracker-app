import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const REDIRECT_COUNT = 10;
const COUNT_DOWN_INTERVAL = 1000;
const HOME_LINK = "/";

export function ErrorPage() {
  const [counter, setCounter] = useState(REDIRECT_COUNT);
  const intervalHandler = useRef();
  const navigateToHome = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      clearInterval(intervalHandler.current);
      navigateToHome(HOME_LINK);
    }
  }, [counter]);

  useEffect(() => {
    intervalHandler.current = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, COUNT_DOWN_INTERVAL);

    return () => {
      clearInterval(intervalHandler.current);
    };
  }, []);

  return (
    <>
      <h1>Something went wrong...</h1>
      <p>Redirecting to Home Page in {counter}</p>
      <p>
        Or click <Link to={HOME_LINK}>Home page</Link> to go back
      </p>
    </>
  );
}
