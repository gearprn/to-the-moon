import React, { useState, useEffect } from 'react';
import { fetchRocket } from '../api';
import RocketCard from './RocketCard';

const PreRocketCard = ({ rocketId }) => {
  const [rocketData, setRocketData] = useState();

  useEffect(() => {
    const fetchRocketData = async () => {
      await fetchRocket(rocketId).then((res) => {
        setRocketData(res);
      });
    };

    fetchRocketData();
  }, [rocketId]);

  return !rocketData ? (
    <div className="w-full">
      <div className="rounded-md bg-white dark:bg-gray-150 h-auto md:h-64 shadow-md overflow-hidden cursor-pointer">
        <div className="h-3/5 w-full " />
        <div className="w-full p-3">
          <h1 className="text-xl">...</h1>
          <p className="text-base">...</p>
          <p className="text-sm status">...</p>
        </div>
      </div>
    </div>
  ) : (
    <>
      <RocketCard data={rocketData} />
    </>
  );
};

export default PreRocketCard;
