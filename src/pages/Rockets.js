import React, { useEffect, useState } from "react";
import RocketCard from "../components/RocketCard";
import { fetchRockets } from "../api/index";

const Rockets = () => {
  const [rocketsData, setRocketsData] = useState([]);

  useEffect(() => {
    const fetchRocketsData = async () => {
      fetchRockets().then((res) => setRocketsData(res));
    };

    fetchRocketsData();
  }, []);

  return (
    <>
      <strong>
        <h6 className='mb-3 text-2xl font-bold'>🚀 Rockets //</h6>
      </strong>
      <div className='flex flex-wrap'>
        {rocketsData.length === 0
          ? "Searching for the rockets in the warehouse ..."
          : rocketsData.map((data, index) => (
              <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3'>
                <RocketCard data={data} key={index} />
              </div>
            ))}
      </div>
    </>
  );
};

export default Rockets;
