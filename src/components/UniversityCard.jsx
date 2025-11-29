import { Link } from "react-router";

const UniversityCard = ({ id, name, image, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  const defaultImage = "https://picsum.photos/600/400";
  const displayImage = image || defaultImage;

  return (
    <div className="relative w-80 rounded-sm overflow-hidden shadow-md group">
      <Link
        to={`/campus/${id}`}
        className="block w-full h-full cursor-pointer"
        style={{ height: 240 }}
      >
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />

        <div
          className="
            absolute bottom-0 left-0 w-full
            bg-primary
            overflow-hidden
            transition-[height] duration-500 ease-in-out
            flex items-center justify-center group-hover:bg-accent
          "
          style={{ height: 60 }}
        >
          <h2 className="text-lg font-semibold text-background transition-colors duration-500 ease-in-out group-hover:text-text">
            {name}
          </h2>
        </div>
      </Link>

      {/* Delete button - positioned absolutely */}
      <button
        onClick={handleDelete}
        className="
          absolute top-2 right-2 
          bg-red-500 text-white 
          rounded-full w-8 h-8 
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          hover:bg-red-600
          z-10
          cursor-pointer
        "
        aria-label="Delete campus"
      >
        ×
      </button>
    </div>
  );
};

export default UniversityCard;
