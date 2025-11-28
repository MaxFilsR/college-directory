import { useParams } from "react-router";

const EditStudents = () => {
  const { studentId } = useParams(0);
  return <div>Edit Students View {studentId}</div>;
};

export default EditStudents;
