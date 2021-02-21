import React from "react";
import { Link } from "react-router-dom";

const RocketCard = ({ data }) => {
  const { rocket_id, rocket_name, company, active, flickr_images } = data;

  return (
    <div className='p-2 w-full md:w-1/2 lg:w-1/3'>
      <Link to={`/rockets/${rocket_id}`}>
        <div className='relative p-3 rounded-md bg-white dark:bg-gray-150 h-64 shadow-md overflow-hidden cursor-pointer'>
          <img
            className='absolute top-0 left-0 h-2/3 w-full'
            src={flickr_images[0]}
            alt=''
          />
          <div className='absolute w-full bottom-3'>
            <h1 className='text-xl'>{rocket_name}</h1>
            <p className='text-base'>{company}</p>
            <p className='text-sm'>{active ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RocketCard;
