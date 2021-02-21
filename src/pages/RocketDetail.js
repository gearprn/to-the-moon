import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRocket } from "../api/index";

const RocketDetail = () => {
  const { rocketId } = useParams();
  const [rocketData, setRocketData] = useState("");
  useEffect(() => {
    const fetchRocketData = async () => {
      await fetchRocket(rocketId).then((res) => setRocketData(res));
    };

    fetchRocketData();
  }, [rocketId]);

  return !rocketData ? "fetching ..." : <pre>{rocketData.rocket_name}</pre>;
};

export default RocketDetail;
