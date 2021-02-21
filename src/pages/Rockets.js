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

  return rocketsData === "" ? "fetching ..." : <pre>{rocketsData}</pre>;
};

export default Rockets;
