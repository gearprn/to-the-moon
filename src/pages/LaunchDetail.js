import React, { useEffect, useState } from "react";
import { fetchLaunch } from "../api/index";

const LaunchDetail = () => {
  const [launchData, setLaunchData] = useState("");
  useEffect(() => {
    const fetchLaunchData = async () => {
      await fetchLaunch(1).then((res) => {
        setLaunchData(JSON.stringify(res, undefined, 2));
      });
    };
    fetchLaunchData();
  }, []);

  return launchData === "" ? "fetching ..." : <pre>{launchData}</pre>;
};

export default LaunchDetail;
