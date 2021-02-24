import React, { useEffect, useState } from 'react';
import { fetchLaunches } from '../api/index';
import LaunchCard from '../components/LaunchCard';
import '../stylesheets/Launches.css';

import {
  yearsConst,
  rocketNamesConst,
  launchStatusConst,
} from '../constants/LaunchesConstant';

const Launches = () => {
  const [offset, setOffset] = useState(0);
  const [rocketName, setRocketName] = useState('');
  const [selectYear, setSelectYear] = useState('');
  const [launchStatus, setLaunchStatus] = useState('');
  const [launchesData, setLaunchesData] = useState([]);

  useEffect(() => {
    const fetchLaunchesData = async () => {
      await fetchLaunches({
        rocketName: rocketName,
        launchYear: selectYear,
        launchSuccess: launchStatus,
        limit: 10,
        offset: 0,
      }).then((res) => {
        console.log(res);
        setLaunchesData(res);
      });
    };
    fetchLaunchesData();
  }, [rocketName, selectYear, launchStatus]);

  useEffect(() => {
    console.log('select value', '=>', rocketName, selectYear, launchStatus);
    fetchLaunches({
      rocketName: rocketName,
      launchYear: selectYear,
      launchSuccess: launchStatus,
      limit: 10,
      offset: offset,
    }).then((res) => {
      setLaunchesData([res]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rocketName, launchStatus, selectYear, offset]);

  useEffect(() => {
    setLaunchesData([]);
    setOffset(0);
  }, [rocketName, launchStatus, selectYear]);

  const renderLaunchCards = launchesData.map((record) => {
    // console.log(record.flight_number);
    return (
      <LaunchCard
        key={record.flight_number + record.mission_name}
        data={record}
      />
    );
  });

  const rocketsOptions = rocketNamesConst.map((rocket) => {
    return (
      <option key={rocket} value={`${rocket}`}>
        {rocket}
      </option>
    );
  });

  const yearOptions = yearsConst.map((year) => {
    return (
      <option key={year} value={`${year}`}>
        {year}
      </option>
    );
  });

  const statusOptions = launchStatusConst.map((status) => {
    return (
      <option key={status} value={`${status}`}>
        {status}
      </option>
    );
  });

  const handleRocketNameChange = (e) => {
    setRocketName(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectYear(e.target.value);
  };

  const handleLaunchStatusChange = (e) => {
    setLaunchStatus(e.target.value);
  };

  const handleScrolling = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    // console.log({ scrollHeight, scrollTop, clientHeight });
    if (clientHeight + scrollTop + 3 > scrollTop) {
      // do something at end of scroll
      setOffset(offset + 10);
    }
  };

  return launchesData === '' ? (
    'fetching ...'
  ) : (
    <>
      <div className="flex flex-wrap">
        <strong>
          <h6 className="text-2xl mb-3 w-full">🔥 Launches //</h6>
        </strong>
        <div className="flex flex-wrap ml-auto">
          <form className="ml-2">
            <label>Rocket Name</label>

            <select
              className="dark:text-black"
              onChange={handleRocketNameChange}
            >
              <option value="">select</option>
              {rocketsOptions}
            </select>
            <label>Year</label>

            <select className="dark:text-black" onChange={handleYearChange}>
              <option value="">select</option>
              {yearOptions}
            </select>
            <label>Launch Status</label>

            <select
              className="dark:text-black"
              onChange={handleLaunchStatusChange}
            >
              {statusOptions}
            </select>
          </form>
        </div>
      </div>
      {launchesData.length === 0 ? (
        <p className="mt-5 text-xl text-center">Record not found.</p>
      ) : (
        <div
          className="flex flex-col md:flex-row flex-wrap h-screen overflow-y-auto overscroll-auto scrollable"
          // onScroll={handleScrolling}
        >
          {renderLaunchCards}
        </div>
      )}
    </>
  );
};

export default Launches;
