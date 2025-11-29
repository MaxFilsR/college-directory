import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import UniversityGrid from "../../components/UniversityGrid";
import {
  fetchAllCampuses,
  selectAllCampuses,
  selectCampusesLoading,
  selectCampusesError,
  deleteCampus,
} from "../../redux/campusSlice";
import LoadingIndicator from "../../components/LoadingIndicator";

const AllCampuses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campuses = useSelector(selectAllCampuses);
  const loading = useSelector(selectCampusesLoading);
  const error = useSelector(selectCampusesError);

  useEffect(() => {
    dispatch(fetchAllCampuses());
  }, [dispatch]);

  const handleDelete = async (campusId) => {
    if (window.confirm("Are you sure you want to delete this campus?")) {
      try {
        await dispatch(deleteCampus(campusId)).unwrap();
      } catch (err) {
        alert(`Failed to delete campus: ${err}`);
      }
    }
  };

  const handleAddCampus = () => {
    navigate("/campuses/add");
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
        <h1 className="text-4xl font-bold text-text underline">All Campuses</h1>
        <div className="text-red-500">Error: {error}</div>
        <button
          onClick={() => dispatch(fetchAllCampuses())}
          className="px-4 py-2 bg-primary text-background rounded hover:bg-secondary hover:text-text cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="text-text py-4 flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold text-text underline">All Campuses</h1>

      <button
        onClick={handleAddCampus}
        className="px-6 py-2 bg-primary text-background rounded hover:bg-accent font-semibold cursor-pointer"
      >
        Add New Campus
      </button>

      {campuses.length === 0 ? (
        <div className="text-xl text-gray-500">
          No campuses found. Click "Add New Campus" to create one!
        </div>
      ) : (
        <div className="w-full rounded p-2">
          <UniversityGrid universities={campuses} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default AllCampuses;
