import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/DateFormat';

const LaunchCard = (props) => {
  const {
    mission_name,
    launch_date_unix,
    launch_success,
    links: { mission_patch_small },
    flight_number,
  } = props.data;

  console.log(mission_patch_small);

  return (
    <div className="p-2 w-full md:w-1/2 lg:w-1/3">
      <Link to={`/launches/${flight_number}`}>
        <div className="relative p-3 rounded-md bg-white dark:bg-gray-150 shadow-md h-56 overflow-hidden">
          <img
            className="absolute w-40 bottom-16 right-2 sm:bottom-6 md:bottom-14 md:w-36 lg:bottom-16 lg:w-36"
            src={mission_patch_small}
            alt=""
          />
          <div className="absolute bottom-3">
            <p className="text-xl tracking-wide mb-3">{mission_name}</p>
            <div className="flex justify-between gap-5">
              <div>
                <p className="text-sm font-light">Launch on</p>
                <p>{formatDate(launch_date_unix)}</p>
              </div>
              <div>
                <p className="text-sm font-light">Launch status</p>
                <p>{launch_success ? 'Success' : 'Failed'}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default LaunchCard;
