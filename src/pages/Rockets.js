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
        <h6 className='mb-3'>Rockets //</h6>
      </strong>
      <div className='flex'>
        {rocketsData.length === 0
          ? "fetching ..."
          : rocketsData.map((data, index) => (
              <RocketCard data={data} key={index} />
            ))}
      </div>
    </>
  );
};

export default Rockets;
