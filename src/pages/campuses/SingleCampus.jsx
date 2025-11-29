import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router";
import {
  fetchCampusById,
  selectCurrentCampus,
  selectCampusesLoading,
  deleteCampus,
} from "../../redux/campusSlice";
import {
  fetchAllStudents,
  selectAllStudents,
  updateStudent,
} from "../../redux/studentSlice";

const SingleCampus = () => {
  const { campusId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campus = useSelector(selectCurrentCampus);
  const loading = useSelector(selectCampusesLoading);
  const allStudents = useSelector(selectAllStudents);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  useEffect(() => {
    dispatch(fetchCampusById(campusId));
    dispatch(fetchAllStudents());
  }, [dispatch, campusId]);

  const enrolledStudents = allStudents.filter((s) => {
    // Handle both string and number comparisons
    return s.campusId == campusId; // Use == for loose equality
  });

  const unenrolledStudents = allStudents.filter((s) => !s.campusId);

  const handleAddExistingStudent = async () => {
    if (!selectedStudentId) return;
    try {
      // selectedStudentId is already a string from the select, find by comparing as strings
      const student = allStudents.find(
        (s) => s.id.toString() === selectedStudentId
      );

      if (!student) {
        console.error("Student not found. Available students:", allStudents);
        console.error("Looking for ID:", selectedStudentId);
        alert("Student not found. Please try refreshing the page.");
        return;
      }

      // Create updated student data with all fields preserved
      // Keep campusId as a number to match the data type in db.json
      const updatedStudentData = {
        ...student,
        campusId: Number(campusId), // Convert to number to match db.json
        updatedAt: new Date().toISOString(),
      };

      await dispatch(
        updateStudent({
          studentId: student.id,
          studentData: updatedStudentData,
        })
      ).unwrap();

      setSelectedStudentId("");
      setShowAddStudent(false);

      // Refetch both to ensure consistency
      await dispatch(fetchCampusById(campusId));
      await dispatch(fetchAllStudents());
    } catch (err) {
      console.error("Add student error:", err);
      alert(`Failed to add student: ${err}`);
    }
  };

  const handleRemoveStudent = async (studentId) => {
    if (window.confirm("Remove this student from the campus?")) {
      try {
        const student = enrolledStudents.find((s) => s.id === studentId);
        if (!student) {
          alert("Student not found");
          return;
        }

        // Create a copy of student data with all fields preserved
        const updatedStudentData = {
          ...student,
          campusId: null, // Remove campus association
          updatedAt: new Date().toISOString(),
        };

        await dispatch(
          updateStudent({
            studentId: student.id,
            studentData: updatedStudentData,
          })
        ).unwrap();

        // Refetch both campus and all students to ensure consistency
        await dispatch(fetchCampusById(campusId));
        await dispatch(fetchAllStudents());
      } catch (err) {
        console.error("Remove student error:", err);
        alert(`Failed to remove student: ${err}`);
      }
    }
  };

  const handleDeleteCampus = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this campus? Students will be unenrolled."
      )
    ) {
      try {
        await dispatch(deleteCampus(campusId)).unwrap();
        navigate("/campuses");
      } catch (err) {
        alert(`Failed to delete campus: ${err}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-text">Loading campus details...</div>
      </div>
    );
  }

  if (!campus) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-red-500">Campus not found</div>
      </div>
    );
  }

  const defaultImage = "https://picsum.photos/600/400";

  return (
    <div className="min-h-screen bg-background pb-12 w-full select-none">
      {/* Hero Section with Image */}
      <div className="relative h-96 overflow-hidden w-full border-b border-primary ">
        <img
          src={campus.imageUrl || defaultImage}
          alt={campus.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background to-primary/25" />
        <div className="absolute bottom-2 left-22 right-0 p-8 text-text">
          <h1 className="text-5xl font-bold mb-2">{campus.name}</h1>
          <p className="text-xl opacity-90">{campus.address}</p>
        </div>
      </div>

      <div className="w-full select-none">
        <div className="max-w-[1400px] mx-auto px-6 -mt-14 relative z-10">
          {/* Action Buttons */}
          <div className="flex gap-3 mb-10 justify-end">
            <Link
              to={`/campuses/${campusId}/edit`}
              className="px-6 py-2 bg-primary text-background rounded-lg hover:bg-accent hover:text-text transition-colors font-semibold shadow-lg"
            >
              Edit Campus
            </Link>
            <button
              onClick={handleDeleteCampus}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-800 transition-colors font-semibold shadow-lg cursor-pointer"
            >
              Delete Campus
            </button>
          </div>

          {/* Campus Details Card */}
          <div className="bg-primary/15 rounded-xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">
              About {campus.name}
            </h2>
            <p className="text-text text-lg leading-relaxed">
              {campus.description || "No description available."}
            </p>
          </div>

          {/* Students Section */}
          <div className="bg-primary/15 rounded-xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-primary">
                Enrolled Students ({enrolledStudents.length})
              </h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddStudent(!showAddStudent)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-primary cursor-pointer transition-colors font-semibold"
                >
                  Add Existing Student
                </button>
                <Link
                  to={`/students/add?campusId=${campusId}`}
                  className="px-4 py-2 bg-primary text-background rounded-lg hover:bg-accent hover:text-text transition-colors font-semibold"
                >
                  Create New Student
                </Link>
              </div>
            </div>

            {/* Add Student Dropdown */}
            {showAddStudent && (
              <div className="mb-6 p-4 bg-primary/30 rounded-lg border-2 border-primary">
                <label className="block text-sm font-semibold text-text mb-2">
                  Select Student to Enroll:
                </label>
                <div className="flex gap-3">
                  <select
                    value={selectedStudentId}
                    onChange={(e) => setSelectedStudentId(e.target.value)}
                    className="flex-1 px-4 py-2 border bg-text border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Choose a student...</option>
                    {unenrolledStudents.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.firstName} {student.lastName}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddExistingStudent}
                    disabled={!selectedStudentId}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-primary transition-colors font-semibold disabled:bg-background/50 disabled:cursor-not-allowed"
                  >
                    Enroll
                  </button>
                  <button
                    onClick={() => setShowAddStudent(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Students List */}
            {enrolledStudents.length === 0 ? (
              <div className="text-center py-12 text-background">
                <p className="text-xl mb-4">No students enrolled yet.</p>
                <p className="text-sm">
                  Click "Add Existing Student" or "Create New Student" to enroll
                  students.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enrolledStudents.map((student) => (
                  <div
                    key={student.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all ease bg-background hover:bg-primary group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={
                          student.imageUrl ||
                          "https://via.placeholder.com/60x60?text=No+Photo"
                        }
                        alt={`${student.firstName} ${student.lastName}`}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/60x60?text=No+Photo";
                        }}
                      />
                      <div className="flex-1">
                        <Link
                          to={`/student/${student.id}`}
                          className="text-lg font-semibold text-text group-hover:text-background shover:underline"
                        >
                          {student.firstName} {student.lastName}
                        </Link>
                        {student.gpa !== null && student.gpa !== undefined && (
                          <p className="text-sm text-primary/30 group-hover:text-accent">
                            GPA: {Number(student.gpa).toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveStudent(student.id)}
                      className="w-full px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-500 hover:text-text transition-colors cursor-pointer"
                    >
                      Remove from Campus
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCampus;
