import CourseList from './components/CourseList';
import TermPage from './components/TermPage';
import {useJsonQuery} from './utilities/fetch';

const url = 'https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php';

interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface CourseList {
  title: string;
  courses: Record<string, Course>;
}


const App = () => {
  const [json, isLoading, error] = useJsonQuery(url);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!json) return null;

  const schedule = json as CourseList;

  return (
    <div>
      <TermPage schedule={schedule} />
    </div>
  );
};

export default App;