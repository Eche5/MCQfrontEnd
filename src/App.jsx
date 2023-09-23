import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CourseSelection from "./pages/CourseSelection";
import Anatomy from "./pages/Anatomy";
import Physiology from "./pages/Physiology";
import Biochemistry from "./pages/Biochemistry";
import ProtectedRoutes from "./Context/ProtectedRoutes";
import DarkMode from "./pages/DarkMode";
import Dashboard2 from "./pages/Dashboard2";
import Charts from "./pages/Charts";
import { DashboardProvider } from "./Context/DashBoardContext";
import Results from "./pages/Results";
import PersistLogin from "./components/PersistLogin";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Homepage /> },
    {
      path: "/:id",
      element: (
        <PersistLogin>
          <ProtectedRoutes>
            <DashboardProvider>
              <Dashboard2 />
            </DashboardProvider>
          </ProtectedRoutes>
        </PersistLogin>
      ),
      children: [
        { path: "/:id", element: <Charts /> },
        { path: "results/:course", element: <Results /> },
      ],
    },
    { path: "/Register", element: <Register /> },
    { path: "/login", element: <Login /> },
    {
      path: "/course",
      element: (
        <PersistLogin>
          <ProtectedRoutes>
            <CourseSelection />
          </ProtectedRoutes>
        </PersistLogin>
      ),
    },
    {
      path: "/:id",

      element: (
        <PersistLogin>
          <DarkMode />
        </PersistLogin>
      ),
      children: [
        {
          path: "anatomy",
          element: (
            <ProtectedRoutes>
              <Anatomy />
            </ProtectedRoutes>
          ),
        },
        {
          path: "physiology",
          element: (
            <ProtectedRoutes>
              <Physiology />
            </ProtectedRoutes>
          ),
        },
        {
          path: "biochemistry",
          element: (
            <ProtectedRoutes>
              <Biochemistry />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
