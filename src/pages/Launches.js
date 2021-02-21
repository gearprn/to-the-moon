import React, { useEffect, useState } from "react";
import { fetchLaunches } from "../api/index";

const Launches = () => {
  const [launchesData, setLaunchesData] = useState("");
  useEffect(() => {
    const fetchLaunchesData = async () => {
      await fetchLaunches().then((res) => {
        setLaunchesData(JSON.stringify(res, undefined, 2));
      });
    };
    fetchLaunchesData();
  }, []);

  return launchesData === "" ? (
    "fetching ..."
  ) : (
    <div>
      <strong>
        <h6 className="mb-3">Launches //</h6>
      </strong>
      <pre>{launchesData}</pre>
    </div>
  );
};

export default Launches;
