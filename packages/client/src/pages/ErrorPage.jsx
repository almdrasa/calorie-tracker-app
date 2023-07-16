import { useNavigateAfterCountDown } from "@root/utils/hooks";
import { Link } from "react-router-dom";

const HOME_LINK = "/";

export function ErrorPage() {
  const counter = useNavigateAfterCountDown(10, HOME_LINK);

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
