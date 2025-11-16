import React from 'react';
import { Course, Program } from '../types';
import { CourseCard } from '../components/CourseCard';

interface KnowledgeHubPageProps {
    courses: Course[];
    programs: Program[];
    onCourseSelect: (course: Course) => void;
}

export const KnowledgeHubPage: React.FC<KnowledgeHubPageProps> = ({ courses, programs, onCourseSelect }) => {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Hub de Conhecimento</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Cursos e mentorias para empoderar sua jornada. Desenvolvido pela equipe SafeJourney e nossos parceiros.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {courses.map(course => {
                        const relatedProgram = programs.find(p => p.id === course.programId);
                        return (
                            <CourseCard 
                                key={course.id} 
                                course={course} 
                                program={relatedProgram}
                                onSelect={onCourseSelect} 
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};