import { useParams } from "react-router";

const AllStudents = () => {
  const { campusId } = useParams();
  return <div>All students View</div>;
};

export default AllStudents;
