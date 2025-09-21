import { useState } from 'react';
import Banner from './Banner';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import SchedulePopup from './SchedulePopup';
import Modal from './Modal';


interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface Schedule {
  title: string;
  courses: Record<string, Course>;
}

const TermPage = ({ schedule }: { schedule: Schedule } ) => {
    
    //stores selected term, default is "Fall"
    const [selected, setSelected] = useState("Fall");

    //stores selected courses in an array
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    // get the unique terms from the schedule
    const terms = [...new Set(Object.values(schedule.courses).map(course => course.term))];

    //filter the courses based on term
    const filteredCourses = Object.fromEntries(
        Object.entries(schedule.courses).filter(([_, course]) => course.term === selected));

    //states for modal
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <div>
            <Banner title={schedule.title} />

            <div className = "flex gap-4 place-content-center items-center">
              <TermSelector name={"term"} options={terms} selected={selected} setSelected={setSelected} />
              <button className = "bg-cyan-400 p-2 rounded-md " onClick={() => setModalOpen(true)} > Show Schedule </button>
            </div>

            <CourseList courses={filteredCourses} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                <SchedulePopup courses={schedule.courses} selectedCourses={selectedCourses} />
            </Modal>
        </div>
    );
};

export default TermPage;