import React, { useEffect, useState } from "react";
import { fetchLaunches } from "../api/index";
import LaunchCard from "../components/LaunchCard";
import "../stylesheets/Launches.css";

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
      await fetchLaunches({ limit: 10, offset: 0 }).then((res) => {
        setLaunchesData(res);
      });
    };
    fetchLaunchesData();
  }, []);

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
          limit: 10,
          offset: offset,
        }).then((res) => {
          setLaunchesData([...launchesData, ...res]);
        }),
      300
    );
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rocketName, launchStatus, selectYear, offset]);

  useEffect(() => {
    setLaunchesData([]);
    setOffset(0);
  }, [rocketName, launchStatus, selectYear]);

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

  const debounce = (func, delay) => {
    let inDebounce;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(inDebounce);
      inDebounce = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleScrolling = debounce((e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    if (clientHeight + scrollTop + 3 >= scrollHeight) {
      // do something at end of scroll
      setOffset(offset + 10);
    }
  }, 120);

  // const handleScrolling = debounce((e) => {
  //   console.log(e);
  // }, 300);

  return launchesData === "" ? (
    "fetching ..."
  ) : (
    <>
      <div className='flex flex-wrap'>
        <strong>
          <h6 className='text-2xl mb-3 w-full'>🔥 Launches //</h6>
        </strong>
        <div className='flex flex-wrap ml-auto'>
          <form className='ml-2'>
            <label>
              Rocket Name:
              <input
                type='text'
                name='name'
                className='ml-2'
                autoComplete='off'
                onChange={(event) => setRocketName(event.target.value)}
                // value={rocketName}
              />
            </label>
            <label> Choose a year: </label>

            <select
              className='dark:text-black'
              name='years'
              id='years'
              onChange={handleYearChange}
            >
              <option value=''>select</option>
              {options}
            </select>
          </form>
          <p className='ml-2'>Launch Status: </p>
          <p className='ml-2 cursor-pointer' onClick={handleLaunchStatusClick}>
            👈🏻
          </p>
          <p className='w-24 text-center'> {launchStatus} </p>
          <p className='cursor-pointer' onClick={handleLaunchStatusClick}>
            👉🏻
          </p>
        </div>
      </div>
      {launchesData.length === 0 ? (
        <p className='mt-5 text-xl text-center'>Record not found.</p>
      ) : (
        <div
          className='flex flex-col md:flex-row flex-wrap h-screen overflow-y-auto overscroll-auto scrollable'
          onScroll={handleScrolling}
        >
          {renderLaunchCards}
        </div>
      )}
    </>
  );
};

export default Launches;
