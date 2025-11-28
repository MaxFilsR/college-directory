import Header from "../../components/Header";
import hunter from "../../assets/hunter.webp";
import UniversityGrid from "../../components/UniversityGrid";

const AllCampuses = () => {
  const universities = [
    { id: 1, name: "Hunter College", image: hunter },
    { id: 2, name: "Hunter College", image: hunter },
    { id: 1, name: "Hunter College", image: hunter },
    { id: 1, name: "Hunter College", image: hunter },
    { id: 1, name: "Hunter College", image: hunter },
    { id: 1, name: "Hunter College", image: hunter },
    ,
    { id: 1, name: "Hunter College", image: hunter },
  ];

  return (
    <div className="text-text py-4 flex flex-col gap-4 items-center">
      <h1 className="text-4xl font-bold text-text underline ">All Campuses</h1>
      <div className="w-full rounded  p-2">
        <UniversityGrid universities={universities} />
      </div>
    </div>
  );
};

export default AllCampuses;
