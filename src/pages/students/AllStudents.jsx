import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import StudentGrid from "../../components/StudentGrid";
import {
  fetchAllStudents,
  selectAllStudents,
  selectStudentsLoading,
  selectStudentsError,
  deleteStudent,
} from "../../redux/studentSlice";
import LoadingIndicator from "../../components/LoadingIndicator";

const AllStudents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector(selectAllStudents);
  const loading = useSelector(selectStudentsLoading);
  const error = useSelector(selectStudentsError);

  useEffect(() => {
    dispatch(fetchAllStudents());
  }, [dispatch]);

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await dispatch(deleteStudent(studentId)).unwrap();
      } catch (err) {
        alert(`Failed to delete student: ${err}`);
      }
    }
  };

  const handleAddStudent = () => {
    navigate("/students/add");
  };

  if (loading) {
    return (
      <div className="text-text py-4 flex flex-col gap-4 justify-center items-center h-screen">
        <LoadingIndicator loading={loading} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-text py-4 flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold text-text underline">All Students</h1>
        <div className="text-red-500">Error: {error}</div>
        <button
          onClick={() => dispatch(fetchAllStudents())}
          className="px-4 py-2 bg-primary text-background rounded hover:bg-secondary hover:text-text cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="text-text py-4 flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold text-text underline">All Students</h1>

      <button
        onClick={handleAddStudent}
        className="px-6 py-2 bg-primary text-background rounded hover:bg-accent font-semibold cursor-pointer"
      >
        Add New Student
      </button>

      {students.length === 0 ? (
        <div className="text-xl text-gray-500">
          No students found. Click "Add New Student" to create one!
        </div>
      ) : (
        <div className="w-full">
          <StudentGrid students={students} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default AllStudents;
