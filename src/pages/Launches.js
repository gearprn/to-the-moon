import React, { useEffect, useState } from "react";
import { fetchLaunches } from "../api/index";

import LaunchCard from "../components/LaunchCard";

const years = [
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
];

const Launches = () => {
  const [offset, setOffset] = useState(0);
  const [rocketName, setRocketName] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [launchStatus, setLaunchStatus] = useState("Default");
  const [launchesData, setLaunchesData] = useState([]);

  useEffect(() => {
    const fetchLaunchesData = async () => {
      await fetchLaunches({ limit: 6, offset: offset }).then((res) => {
        console.log(res);
        setLaunchesData(res);
      });
    };
    fetchLaunchesData();
  }, [offset]);

  useEffect(() => {
    const isLaunchSuccess =
      launchStatus === "Default"
        ? ""
        : launchStatus === "Success"
        ? true
        : false;
    const timeOutId = setTimeout(
      () =>
        fetchLaunches({
          rocketName: rocketName,
          launchYear: selectYear,
          launchSuccess: isLaunchSuccess,
          limit: 6,
          offset: offset,
        }).then((res) => {
          setLaunchesData(res);
        }),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [rocketName, offset, launchStatus, selectYear]);

  const renderLaunchCards = launchesData.map((record) => {
    return <LaunchCard key={record.flight_number} data={record} />;
  });

  const options = years.map((year, index) => {
    return (
      <option key={index} value={`${year}`}>
        {year}
      </option>
    );
  });

  const handleYearChange = (e) => {
    setSelectYear(e.target.value);
  };

  const handleLaunchStatusClick = (e) => {
    if (launchStatus === "Default" && e.target.innerHTML === "👈🏻") {
      setLaunchStatus("Failed");
    } else if (launchStatus === "Failed" && e.target.innerHTML === "👈🏻") {
      setLaunchStatus("Success");
    } else if (launchStatus === "Success" && e.target.innerHTML === "👈🏻") {
      setLaunchStatus("Default");
    } else if (launchStatus === "Default" && e.target.innerHTML === "👉🏻") {
      setLaunchStatus("Success");
    } else if (launchStatus === "Success" && e.target.innerHTML === "👉🏻") {
      setLaunchStatus("Failed");
    } else if (launchStatus === "Failed" && e.target.innerHTML === "👉🏻") {
      setLaunchStatus("Default");
    }
  };

  return launchesData === "" ? (
    "fetching ..."
  ) : (
    <div>
      <div className="flex">
        <strong>
          <h6 className="mb-3">🔥 Launches //</h6>
        </strong>
        <div className="flex ml-auto">
          <form className="ml-2">
            <label>
              Rocket Name
              <input
                type="text"
                name="name"
                className="ml-2"
                autoComplete="off"
                onChange={(event) => setRocketName(event.target.value)}
                // value={rocketName}
              />
            </label>
            <label> Choose a year: </label>

            <select name="years" id="years" onChange={handleYearChange}>
              <option value="">select</option>
              {options}
            </select>
          </form>
          <p className="ml-2">Launch Status: </p>
          <p className="ml-2 cursor-pointer" onClick={handleLaunchStatusClick}>
            👈🏻
          </p>
          <p className="w-24 text-center"> {launchStatus} </p>
          <p className="cursor-pointer" onClick={handleLaunchStatusClick}>
            👉🏻
          </p>
        </div>
      </div>
      {launchesData.length === 0 ? (
        <p className="mt-5 text-xl text-center">Record not found.</p>
      ) : (
        <div className="flex flex-col md:flex-row flex-wrap">
          {renderLaunchCards}
        </div>
      )}
    </div>
  );
};

export default Launches;
