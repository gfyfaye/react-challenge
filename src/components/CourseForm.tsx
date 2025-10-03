import { useState } from 'react';

interface Course {
    term: string;
    number: string;
    meets: string;
    title: string;
}

interface CourseFormProps {
    course: Course;
    onCancel: () => void;
}

const CourseForm = ({ course, onCancel }: CourseFormProps ) => {
    const [title, setTitle] = useState(course.title);
    const [meetingtime, setMeetingTime] = useState(course.meets);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Edit Course Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-lg font-bold mb-2">Course Title</label>
                    <input 
                        id="title"
                        type="text" 
                        name="title" 
                        value={title} 
                        onChange={(evt) => setTitle(evt.target.value)}
                        className="w-full rounded border border-gray-300 p-3 shadow shadow-gray-100 text-gray-800"
                    />
                </div>
                
                <div className="mb-6">
                    <label htmlFor="meetingtime" className="block text-lg font-bold mb-2">Meeting Times</label>
                    <input 
                        id="meetingtime"
                        type="text" 
                        name="meetingtime" 
                        value={meetingtime} 
                        onChange={(evt) => setMeetingTime(evt.target.value)}
                        className="w-full rounded border border-gray-300 p-3 shadow shadow-gray-100 text-gray-800"
                    />
                </div>
                
                <div className="flex justify-end">
                    <button 
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CourseForm;