import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import AllCampuses from "./pages/campuses/AllCampuses";
import SingleCampus from "./pages/campuses/SingleCampus";
import EditCampus from "./pages/campuses/EditCampus";
import AllStudents from "./pages/students/AllStudents";
import SingleStudent from "./pages/students/SingleStudents";
import EditStudents from "./pages/students/EditStudents";
import PageNotFound from "./pages/404";
import AddCampus from "./pages/campuses/AddCampus";
import AddStudent from "./pages/students/AddStudents";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route path="/campuses" element={<AllCampuses />} />
        <Route path="/campus/:campusId" element={<SingleCampus />} />
        <Route path="/campuses/add" element={<AddCampus />} />
        <Route path="/add-campus" element={<AddCampus />} />
        <Route path="/campuses/:campusId/edit" element={<EditCampus />} />

        <Route path="/students" element={<AllStudents />} />
        <Route path="/students/add" element={<AddStudent />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student/:studentId" element={<SingleStudent />} />
        <Route path="/students/:studentId/edit" element={<EditStudents />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
