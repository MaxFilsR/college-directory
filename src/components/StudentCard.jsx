import { Link } from "react-router";

const StudentCard = ({ id, firstName, lastName, imageUrl, gpa, onDelete }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete(id);
  };

  const defaultImage = "https://picsum.photos/600/400";
  const displayImage = imageUrl || defaultImage;
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className="relative w-64 rounded-sm overflow-hidden shadow-md group bg-white">
      <Link to={`/student/${id}`} className="block w-full cursor-pointer">
        <div className="w-full h-64 overflow-hidden">
          <img
            src={displayImage}
            alt={fullName}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
        </div>

        <div className="p-4 bg-primary transition-colors duration-300 group-hover:bg-accent ">
          <h3 className="text-lg font-semibold text-background mb-1 group-hover:text-text">
            {fullName}
          </h3>
          {gpa !== null && gpa !== undefined && (
            <p className="text-sm text-accent/80 group-hover:text-primary">
              GPA: {Number(gpa).toFixed(2)}
            </p>
          )}
        </div>
      </Link>

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
          text-xl
          font-bold
          cursor-pointer
        "
        aria-label="Delete student"
      >
        ×
      </button>
    </div>
  );
};

export default StudentCard;
