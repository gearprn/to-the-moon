import React, { useEffect, useState } from "react";
import { fetchRockets } from "../api/index";

const Rockets = () => {
  const [rocketsData, setRocketsData] = useState("");
  useEffect(() => {
    const fetchLaunchData = async () => {
      await fetchRockets().then((res) => {
        setRocketsData(JSON.stringify(res, undefined, 2));
      });
    };
    fetchLaunchData();
  }, []);

  return rocketsData === "" ? (
    "fetching ..."
  ) : (
    <div>
      <strong>
        <h6 className="mb-3">Rockets //</h6>
      </strong>
      <pre>{rocketsData}</pre>
    </div>
  );
};

export default Rockets;
