import { IoIosSchool } from "react-icons/io";
import { Link, useLocation } from "react-router";

const Header = () => {
  const location = useLocation();
  const navMenu = [
    { name: "Home", path: "/" },
    { name: "All campuses", path: "/campuses" },
    { name: "All Students", path: "/students" },
  ];
  return (
    <div className="w-full bg-background p-4 flex justify-center border-b border-primary">
      <div className="max-w-[1400px] w-full flex justify-between text-text">
        <Link to={"/"}>
          <div className="text-primary text-3xl flex gap-1 items-center">
            <IoIosSchool size={40} />
            <h1>Campus Directory</h1>
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          {navMenu.map((item) => {
            return (
              <Link
                to={item.path}
                className={`hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary font-bold"
                    : ""
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;
