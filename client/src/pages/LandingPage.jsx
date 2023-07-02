import { Link } from "react-router-dom";

export function LandingPage() {
  return (
    <>
      <p>Welcome to Calorie Tracker App</p>
      <p>
        To get started, <Link to="/track">Start tracking</Link>
      </p>
    </>
  );
}
