import { Link, Outlet, useLocation } from "react-router";
import Header from "../components/Header";
import hunter from "../assets/hunter.webp";
import students from "../assets/students.webp";
import NavCard from "../components/NavCard";

const cards = [
  { name: "All Campuses", image: hunter, path: "/campuses" },
  { name: "All Students", image: students, path: "/students" },
];

const HomePage = () => {
  const location = useLocation();
  return (
    <main className="min-h-screen flex flex-col items-center  bg-background">
      <Header />
      {location.pathname === "/" ? (
        <div className="w-full max-w-[1400px] grow px-4 py-6 text-text flex flex-col md:flex-row items-center gap-12 ">
          {cards.map((card) => (
            <NavCard title={card.name} image={card.image} path={card.path} />
          ))}
        </div>
      ) : (
        <Outlet />
      )}
    </main>
  );
};

export default HomePage;
