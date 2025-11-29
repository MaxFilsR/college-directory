import UniversityCard from "./UniversityCard";

const UniversityGrid = ({ universities, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {universities.map((uni) => (
        <UniversityCard
          key={uni.id}
          id={uni.id}
          name={uni.name}
          image={uni.imageUrl}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default UniversityGrid;
