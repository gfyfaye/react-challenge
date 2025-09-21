interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface CourseListProps {
  courses: Record<string, Course>;
  selectedCourses: string[];
  setSelectedCourses: React.Dispatch<React.SetStateAction<string[]>>;
}

const CourseList = ({ courses, selectedCourses, setSelectedCourses }: CourseListProps ) => {

    return (
        <div className= "grid grid-cols-1 sm: grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
        {Object.entries(courses).map(([id, course]) => {
            const isSelected = selectedCourses.includes(id);
            return (

            // Single course card
            <div key={id} className={`rounded-lg p-8 h-58 flex flex-col justify-between cursor-pointer ${isSelected ? "bg-blue-100 border-blue-500 border-2" : "bg-white border-gray-200 border"}`} 
                onClick={() =>
                    setSelectedCourses(isSelected
                        ? selectedCourses.filter(cid => cid !== id)
                        : [...selectedCourses, id]
                    )
                }>

                <div className = "text-2xl">
                {course.term} CS {course.number}
                </div>

                <div className = "text-md">
                {course.title}
                </div>

                <div className="border-t border-gray-200 my-2"></div>

                <div>
                    {course.meets}
                </div>
            </div>
            );
        })}
    </div>
    );
};

export default CourseList;