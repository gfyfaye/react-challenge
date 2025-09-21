interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface SchedulePopupProps {
  courses: Record<string, Course>;
  selectedCourses: string[];
}


const SchedulePopup = ({ courses, selectedCourses}: SchedulePopupProps ) => {
    return (
        // popup container
        <div>
        <h2 className="text-xl font-bold mb-4">Selected Courses</h2>
        {selectedCourses.map(id => {

            // the course corresponding to that id
            const course = courses[id];
            
            return (
            // Single item on list
                <div key={id} >
    
                    <div className = "font-bold">
                    {course.term} CS {course.number}
                    </div>

                    <div className = "mb-6 text-gray-400">
                    {course.title} - {course.meets}
                    </div>
                </div>
            );
        })}
    </div>
    );
};

export default SchedulePopup;