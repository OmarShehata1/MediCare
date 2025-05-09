import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const { name, image, rating, text, date } = testimonial;
  
  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="absolute top-4 right-4 text-primary-200">
        <Quote size={36} />
      </div>
      
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
              />
            ))}
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 flex-grow mb-3">{text}</p>
      
      <div className="text-sm text-gray-500">{date}</div>
    </div>
  );
};

export default TestimonialCard;