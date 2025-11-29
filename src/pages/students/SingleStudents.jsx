import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router";
import {
  fetchStudentById,
  selectCurrentStudent,
  selectStudentsLoading,
  deleteStudent,
  fetchAllStudents,
  selectAllStudents,
} from "../../redux/studentSlice";
import { fetchAllCampuses, selectAllCampuses } from "../../redux/campusSlice";

const SingleStudent = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentStudent = useSelector(selectCurrentStudent);
  const allStudents = useSelector(selectAllStudents);
  const loading = useSelector(selectStudentsLoading);
  const campuses = useSelector(selectAllCampuses);

  // Get the student from allStudents to ensure we have the latest data
  const student =
    allStudents.find((s) => s.id.toString() === studentId) ||
    allStudents.find((s) => s.id === Number(studentId)) ||
    currentStudent;

  useEffect(() => {
    dispatch(fetchStudentById(studentId));
    dispatch(fetchAllStudents());
    dispatch(fetchAllCampuses());
  }, [dispatch, studentId]);

  const handleDeleteStudent = async () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await dispatch(deleteStudent(studentId)).unwrap();
        navigate("/students");
      } catch (err) {
        alert(`Failed to delete student: ${err}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-text">Loading student details...</div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-red-500">Student not found</div>
      </div>
    );
  }

  const defaultImage = "https://picsum.photos/600/400";
  // Find campus from campuses array based on student's campusId
  const enrolledCampus = student.campusId
    ? campuses.find((c) => c.id === student.campusId)
    : null;

  return (
    <div className="min-h-screen bg-background py-12 w-full">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/students")}
          className="mb-6 text-text hover:text-primary flex items-center gap-2 transition-colors cursor-pointer"
        >
          <span className="text-xl">←</span> Back to All Students
        </button>

        {/* Main Card */}
        <div className="bg-text/15 rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left Side - Image */}
            <div className="md:w-2/5 bg-linear-to-br from-primary to-secondary flex items-center justify-center p-8">
              <img
                src={student.imageUrl || defaultImage}
                alt={`${student.firstName} ${student.lastName}`}
                className="w-64 h-64 rounded-full object-cover border-8 border-primary/80 shadow-xl"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </div>

            {/* Right Side - Details */}
            <div className="md:w-3/5 p-8">
              <div className="mb-6">
                <h1 className="text-4xl font-bold text-text mb-2">
                  {student.firstName} {student.lastName}
                </h1>
                <div className="h-1 w-20 bg-primary rounded-full"></div>
              </div>

              {/* Info Grid */}
              <div className="space-y-6 mb-8">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="bg-background p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-primary/50 font-semibold">
                      Email
                    </p>
                    <a
                      href={`mailto:${student.email}`}
                      className="text-lg text-text hover:text-primary transition-colors"
                    >
                      {student.email}
                    </a>
                  </div>
                </div>

                {/* GPA */}
                {student.gpa !== null && student.gpa !== undefined && (
                  <div className="flex items-start gap-3">
                    <div className="bg-background p-3 rounded-lg">
                      <svg
                        className="w-6 h-6 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-primary/50 font-semibold">
                        GPA
                      </p>
                      <p className="text-lg text-text">
                        {Number(student.gpa).toFixed(2)} / 4.00
                      </p>
                    </div>
                  </div>
                )}

                {/* Campus */}
                <div className="flex items-start gap-3">
                  <div className="bg-background p-3 rounded-lg">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-primary/50 font-semibold">
                      Campus
                    </p>
                    {enrolledCampus ? (
                      <Link
                        to={`/campus/${enrolledCampus.id}`}
                        className="text-lg text-text hover:underline font-medium"
                      >
                        {enrolledCampus.name}
                      </Link>
                    ) : (
                      <p className="text-lg text-text/50 italic">
                        Not enrolled in any campus
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-primary">
                <Link
                  to={`/students/${studentId}/edit`}
                  className="flex-1 px-6 py-3 bg-accent text-white rounded-lg hover:bg-primary transition-colors font-semibold text-center"
                >
                  Edit Student
                </Link>
                <button
                  onClick={handleDeleteStudent}
                  className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold cursor-pointer"
                >
                  Delete Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
