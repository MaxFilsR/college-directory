import { Link } from "react-router";

const NavCard = ({ title, image, path }) => {
  return (
    <Link
      to={path}
      className="relative w-full md:w-1/2 h-[350px] rounded-xl overflow-hidden group cursor-pointer"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-background/40 group-hover:bg-primary/50 transition-colors duration-300" />

      {/* Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-text text-4xl font-bold drop-shadow-lg group-hover:text-background">
          {title}
        </span>
      </div>
    </Link>
  );
};

export default NavCard;
