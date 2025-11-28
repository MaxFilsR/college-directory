import { useParams } from "react-router";

const SingleStudent = () => {
  const { studentId } = useParams(0);
  return <div>Single Student View {studentId}</div>;
};

export default SingleStudent;
