import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AllCampuses from "./pages/campuses/AllCampuses";
import SingleCampus from "./pages/campuses/SingleCampus";
import EditCampus from "./pages/campuses/EditCampus";
import AllStudents from "./pages/campuses/AllCampuses";
import SingleStudent from "./pages/students/SingleStudents";
import EditStudents from "./pages/students/EditStudents";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/campuses" element={<AllCampuses />} />
      <Route path="/campus/:campusId" element={<SingleCampus />} />
      <Route path="/campus/add" element={<EditCampus />} />
      <Route path="/campus/:campusId/edit" element={<EditCampus />} />

      <Route path="/students" element={<AllStudents />} />
      <Route path="/student/add" element={<AllStudents />} />
      <Route path="/student/:studentId" element={<SingleStudent />} />
      <Route path="/student/:studentId/edit" element={<EditStudents />} />

      <Route path="*" element={<>404</>} />
    </Routes>
  );
};

export default App;
