import React from 'react';
import { Course, Program } from '../types';

interface CourseCardProps {
    course: Course;
    program: Program | undefined;
    onSelect: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, program, onSelect }) => {
    const hasDiscount = course.discountPercentage && course.discountPercentage > 0;
    const finalPrice = hasDiscount ? Math.round(course.price * (1 - course.discountPercentage! / 100)) : course.price;
    
    return (
        <div 
            onClick={() => onSelect(course)}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        >
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase rounded-full ${course.type === 'Curso' ? 'bg-[#66cdaa]/20 text-[#5f9ea0]' : 'bg-[#daa520]/20 text-[#b8860b]'}`}>
                        {course.type}
                    </span>
                    
                    {hasDiscount ? (
                        <div className="text-right">
                            <div className="flex items-baseline justify-end gap-2">
                                <span className="text-gray-500 line-through text-md">${course.price}</span>
                                <span className="text-2xl font-bold text-gray-800">${finalPrice}</span>
                            </div>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
                                {course.discountPercentage}% OFF
                            </span>
                        </div>
                    ) : (
                        <span className="text-2xl font-bold text-gray-800">${course.price}</span>
                    )}

                </div>
                <h3 className="mt-3 text-xl font-bold text-gray-900">{course.title}</h3>
                <p className="mt-3 text-base text-gray-500 flex-grow">{course.description}</p>
                
                <div className="mt-auto pt-4">
                    <div className="mt-4 p-3 bg-teal-50 rounded-md border border-teal-200">
                        <p className="text-sm font-semibold text-teal-800">Vinculado ao programa:</p>
                        <p className="text-sm text-teal-700 truncate">{program ? program.name : 'Programa não encontrado'}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 text-sm font-medium text-gray-700">
                        <p>com <span className="font-semibold">{course.instructor}</span></p>
                        <p className="text-gray-500">Parceiro: {course.partner}</p>
                    </div>
                </div>
            </div>
            <div className="p-6 bg-gray-50">
                <div 
                    className="w-full bg-[#66CDAA] text-white font-bold py-2 px-4 rounded-md text-center transition-colors duration-300 group-hover:bg-[#5F9EA0]">
                    Saber Mais
                </div>
            </div>
        </div>
    );
};