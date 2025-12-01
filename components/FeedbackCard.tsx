import React from 'react';
import { Feedback } from '../types';
import { StarIcon } from './icons/StarIcon';

interface FeedbackCardProps {
  feedback: Feedback;
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-[#DAA520]' : 'text-gray-300'}`} />
    ))}
  </div>
);

export const FeedbackCard: React.FC<FeedbackCardProps> = ({ feedback }) => {
  return (
    <div className="flex-shrink-0 w-80 md:w-96 bg-gray-50 p-6 rounded-lg shadow-sm mx-4 flex flex-col h-full border border-gray-200">
      <div className="flex-grow">
        <p className="text-gray-600 italic">"{feedback.comment}"</p>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full mr-3" src={feedback.avatar} alt={feedback.author} />
          <div>
            <p className="font-semibold text-gray-800">{feedback.author}</p>
            <p className="text-sm text-gray-500">{feedback.date}</p>
          </div>
        </div>
        <RatingStars rating={feedback.rating} />
      </div>
    </div>
  );
};