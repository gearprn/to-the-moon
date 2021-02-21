import React, { useEffect, useState } from "react";
import { fetchRocket } from "../api/index";

const RocketDetail = () => {
  const [rocketData, setRocketData] = useState("");
  useEffect(() => {
    const fetchLaunchData = async () => {
      await fetchRocket("falcon1").then((res) => {
        setRocketData(JSON.stringify(res, undefined, 2));
      });
    };
    fetchLaunchData();
  }, []);

  return rocketData === "" ? "fetching ..." : <pre>{rocketData}</pre>;
};

export default RocketDetail;
