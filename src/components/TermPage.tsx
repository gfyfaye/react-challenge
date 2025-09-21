import { useState } from 'react';
import Banner from './Banner';
import TermSelector from './TermSelector';
import CourseList from './CourseList';


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

// ...e

const TermPage = ({ schedule }: { schedule: Schedule } ) => {

    const [selected, setSelected] = useState("Fall");
    const terms = [...new Set(Object.values(schedule.courses).map(course => course.term))];
    const filteredCourses = Object.fromEntries(
        Object.entries(schedule.courses).filter(([_, course]) => course.term === selected));

    return (
        <div>
            <Banner title={schedule.title} />
            <TermSelector name={"term"} options={terms} selected={selected} setSelected={setSelected} />
            <CourseList courses={filteredCourses} />
        </div>
    );
};

export default TermPage;