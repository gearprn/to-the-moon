import React from "react";

const RocketCard = ({ data }) => {
  const { rocket_name, company, flickr_images } = data;

  return (
    <div className='p-2 w-full md:w-1/2 lg:w-1/3'>
      <div className='relative p-3 rounded-md bg-white dark:bg-gray-150 shadow-md h-56 overflow-hidden'>
        <img
          className='absolute top-0 left-0 w-full'
          src={flickr_images[0]}
          alt=''
        />
        <div className='absolute bottom-3'>
          <h1>{rocket_name}</h1>
          <div className='flex justify-between gap-5'>
            <div>
              <p>{company}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketCard;
