import React, { useEffect, useState } from "react";
import { fetchLaunches } from "../api/index";

import LaunchCard from "../components/LaunchCard";

const Launches = () => {
  const [offset, setOffset] = useState(0);
  const [launchesData, setLaunchesData] = useState([]);
  useEffect(() => {
    const fetchLaunchesData = async () => {
      await fetchLaunches({ limit: 6, offset: offset }).then((res) => {
        setLaunchesData(res);
        // setLaunchesData(JSON.stringify(res, undefined, 2));
      });
    };
    fetchLaunchesData();
  }, [offset]);

  const renderLaunchCards = launchesData.map((record) => {
    console.log(record);
    return <LaunchCard key={record.flight_number} data={record} />;
  });

  return launchesData === "" ? (
    "fetching ..."
  ) : (
    <div>
      <strong>
        <h6 className='mb-3'>🔥 Launches //</h6>
      </strong>
      <div className='flex flex-col md:flex-row flex-wrap'>
        {renderLaunchCards}
      </div>
    </div>
  );
};

export default Launches;
