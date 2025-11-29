import StudentCard from "./StudentCard";

const StudentGrid = ({ students, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          id={student.id}
          firstName={student.firstName}
          lastName={student.lastName}
          imageUrl={student.imageUrl}
          gpa={student.gpa}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default StudentGrid;
