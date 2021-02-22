import React from "react";
import { Link } from "react-router-dom";
import "../stylesheets/RocketCard.css";

const RocketCard = ({ data }) => {
  const { rocket_id, rocket_name, company, active, flickr_images } = data;

  return (
    <div className='w-full md:w-1/2 lg:w-1/3 p-3'>
      <Link to={`/rockets/${rocket_id}`}>
        <div className='rounded-md bg-white dark:bg-gray-150 h-auto md:h-64 shadow-md overflow-hidden cursor-pointer'>
          <img
            className='h-3/5 w-full'
            src={flickr_images[0]}
            alt={rocket_name}
          />
          <div className='w-full p-3'>
            <h1 className='text-xl'>{rocket_name}</h1>
            <p className='text-base'>{company}</p>
            <p className={`text-sm status ${active ? "active" : ""}`}>
              {active ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RocketCard;
