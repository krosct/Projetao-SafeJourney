

import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="p-6 flex-grow">
                <p className="text-sm font-semibold text-[#66CDAA] uppercase">{course.partner}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900">{course.title}</h3>
                <p className="mt-3 text-base text-gray-500">{course.description}</p>
                <p className="mt-4 text-sm font-medium text-gray-700">com {course.instructor}</p>
            </div>
            <div className="p-6 bg-gray-50">
                <button className="w-full bg-[#66CDAA] text-white font-bold py-2 px-4 rounded-md hover:bg-[#5F9EA0] transition-all duration-300 transform hover:scale-105">
                    Acessar Curso
                </button>
            </div>
        </div>
    );
};
