import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  LandingPage,
  TrackPage,
  PageLayout,
  ErrorPage,
  DetailPage,
} from "@pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "track",
        element: <TrackPage />,
      },
      {
        path: "track/:recordId",
        element: <DetailPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
