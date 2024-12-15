import React from 'react';
import { useNavigate } from 'react-router-dom';

const SpecialityCard = ({ photo, title }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate('/all-doctors', { state: { title } })} // Passing title as state
      className="cursor-pointer relative transition-all duration-1000 ease-in-out hover:-translate-y-2"
    >
      <img
        className="md:w-full w-16 block m-auto transition-transform duration-1000 ease-in-out"
        src={`/assets/assets_frontend/${photo}.svg`}
        alt={title}
      />
      <h5 className="py-2 text-sm text-center">{title}</h5>
    </div>
  );
};

export default SpecialityCard;
