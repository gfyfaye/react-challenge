import { parseDays, parseHours, hasConflict } from '../utilities/timeconflict';
import { occupied as importedOccupied } from '../utilities/timeconflict';
import { Link } from '@tanstack/react-router';

const occupied: Record<string, any[]> = importedOccupied;

// helper to update occupied dict when a course is selected or deselected
const updateOccupiedTimes = (course: Course) => {
    const [days, hours] = course.meets.split(" ");
    const parsedDays = parseDays(days);
    const parsedHours = parseHours(hours);
    
    parsedDays.forEach(d => {
        occupied[d].push(parsedHours);
    });
};

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
                const hasTimeConflict = hasConflict(course);

                return (
                    // Single course card
                    <div key={id} className={`rounded-lg p-8 h-58 flex flex-col justify-between cursor-pointer ${isSelected ? "bg-blue-100 border-blue-500 border-2" : hasTimeConflict ? " text-gray-300 bg-gray-50 border-gray-200 border-2" : "bg-white border-gray-200 border"}`} 
                        onClick={() => {
    
                            if (!isSelected && !hasTimeConflict) {
                                
                                //add this day and time to occupied dict
                                updateOccupiedTimes(course);

                                //add to select courses
                                setSelectedCourses([...selectedCourses, id]);

                            } else if (isSelected) {

                                //already selected, so deselect and remove from occupied
                                Object.keys(occupied).forEach(day => occupied[day] = []);

                                // rebuild based on selected courses, exclude the one being deslected
                                selectedCourses
                                    .filter(cid => cid !== id) // exclude course being deselected
                                    .forEach(cid => {
                                        
                                        //update occupied with this course
                                        updateOccupiedTimes(courses[cid]);
                                    });
                                setSelectedCourses(selectedCourses.filter(cid => cid !== id));
                            }
                        }}>

                        <div className = "text-2xl">
                        {course.term} CS {course.number}
                        </div>

                        <div className = "text-md">
                        {course.title}
                        </div>

                        <div className="border-t border-gray-200 my-2"></div>

                        <div className="flex justify-between items-center">
                            <span>{course.meets}</span>
                            <Link to="/course/edit/$courseId" 
                                params={{ courseId: id }}
                                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                                Edit
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CourseList;