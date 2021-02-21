import React, { useEffect, useState } from "react";
import { fetchInfos } from "../api/index";

const Home = () => {
  const [info, setInfo] = useState({});
  useEffect(() => {
    const fetchSpacexData = async () => {
      await fetchInfos().then((res) => {
        setInfo(res);
      });
    };
    fetchSpacexData();
  }, []);

  return info === {} ? (
    "fetching"
  ) : (
    <div className="mx-auto sm:w-full md:w-1/2 lg:w-1/3">
      <strong>
        <h6 className="mb-3">🛰 SpaceX //</h6>
      </strong>
      <p className="pl-3 mb-3">{info.summary}</p>
    </div>
  );
};

export default Home;
