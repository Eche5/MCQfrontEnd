import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CourseSelection from "./pages/CourseSelection";
import Anatomy from "./pages/Anatomy";
import Physiology from "./pages/Physiology";
import Biochemistry from "./pages/Biochemistry";
import ProtectedRoutes from "./Context/ProtectedRoutes";
import Dashboard2 from "./pages/Dashboard2";
import Charts from "./pages/Charts";
import { DashboardProvider } from "./Context/DashBoardContext";
import Results from "./pages/Results";
import PersistLogin from "./components/PersistLogin";
import { QuestionProvider } from "./Context/QuestionContext";
import { Suspense } from "react";
import Loader from "./pages/Loader";
import "./App.css";

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoutes />}>
            <Route element={<DashboardProvider />}>
              <Route path="/:id" element={<Dashboard2 />}>
                <Route path="/:id" element={<Charts />} />
                <Route path="results/:course" element={<Results />} />
              </Route>
            </Route>
            <Route element={<QuestionProvider />}>
              <Route path="/course" element={<CourseSelection />} />
              <Route path="course/anatomy" element={<Anatomy />} />
              <Route path="course/physiology" element={<Physiology />} />
              <Route path="course/biochemistry" element={<Biochemistry />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
