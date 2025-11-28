import { useParams } from "react-router";

const SingleCampus = () => {
  const { campusId } = useParams(0);
  return <div>Single Campus View {campusId}</div>;
};

export default SingleCampus;
