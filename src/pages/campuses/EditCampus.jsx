import { useParams } from "react-router";

const EditCampus = () => {
  const { campusId } = useParams(0);
  return <div>Edit Campus View {campusId}</div>;
};

export default EditCampus;
