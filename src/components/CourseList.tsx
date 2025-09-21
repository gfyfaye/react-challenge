interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface CourseListProps {
  courses: Record<string, Course>
}

const CourseList = ({ courses }: CourseListProps ) => (

    <div className= "grid grid-cols-1 sm: grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4">
    {Object.entries(courses).map(([id, course]) => (
        <div key={id} className = "border-3 border-gray-200 rounded-lg p-8 h-58 flex flex-col justify-between">
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
        ))}
    </div>
);

export default CourseList;