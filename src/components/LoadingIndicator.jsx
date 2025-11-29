import { PacmanLoader } from "react-spinners";

const LoadingIndicator = ({ loading }) => {
  return (
    <div className="flex flex-col gap-4">
      <PacmanLoader size={20} loading={loading} color={"white"} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingIndicator;
