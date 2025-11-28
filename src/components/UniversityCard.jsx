import { Link } from "react-router";

const UniversityCard = ({ id, name, image }) => {
  return (
    <Link
      to={`/campus/${id}`}
      className="relative block w-80 rounded-sm overflow-hidden shadow-md cursor-pointer group"
      style={{ height: 240 }}
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />

      {/* Sliding text background */}
      <div
        className="
          absolute bottom-0 left-0 w-full
          bg-primary
          overflow-hidden
          transition-[height] duration-500 ease-in-out
          flex items-center justify-center
          "
        style={{ height: 60 }}
      >
        <h2 className="text-lg font-semibold text-background transition-colors duration-500 ease-in-out group-hover:text-text">
          {name}
        </h2>
      </div>

      {/* Expand text background on hover */}
      <style>{`
        a.group:hover div {
          height: 100%;
        }
      `}</style>
    </Link>
  );
};

export default UniversityCard;
