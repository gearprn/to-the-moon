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
      await fetchLaunches({ limit: 10, offset: 0 }).then((res) => {
        setLaunchesData(res);
      });
    };
    fetchLaunchesData();
  }, []);

  useEffect(() => {
    const isLaunchSuccess =
      launchStatus === '' ? '' : launchStatus === 'success' ? true : false;

    const timeOutId = setTimeout(
      () =>
        fetchLaunches({
          rocketName: rocketName,
          launchYear: selectYear,
          launchSuccess: isLaunchSuccess,
          limit: 10,
          offset: offset,
        }).then((res) => {
          setLaunchesData(res);
        }),
      0
    );
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rocketName, launchStatus, selectYear, offset]);

  const renderLaunchCards = launchesData.map((record) => {
    return <LaunchCard key={record.flight_number} data={record} />;
  });

  const rocketOptions = rocketNamesConst.map((rocket, index) => {
    return (
      <option key={index} value={`${rocket}`}>
        {rocket}
      </option>
    );
  });

  const yearOptions = yearsConst.map((year, index) => {
    return (
      <option key={index} value={`${year}`}>
        {year}
      </option>
    );
  });

  const statusOptions = launchStatusConst.map((status, index) => {
    return (
      <option key={index} value={`${status}`}>
        {status}
      </option>
    );
  });

  const handleRocketNameChange = (e) => {
    setRocketName(e.target.value);
  };

  const handleYearChange = (e) => {
    console.log();
    setSelectYear(e.target.value);
  };

  const handleStatusChange = (e) => {
    setLaunchStatus(e.target.value);
  };

  const handleScrolling = (e) => {
    const { scrollHeight, scrollTop, clientHeight } = e.target;
    console.log({ scrollHeight, scrollTop, clientHeight });
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
            {/* <label>
              Rocket Name:
              
            </label>
            <label> Choose a year: </label> */}

            <select
              className="dark:text-black w-36 rounded-sm mr-2"
              onChange={handleRocketNameChange}
            >
              <option value="">Rocket Name</option>
              {rocketOptions}
            </select>

            <select
              className="dark:text-black w-36 rounded-sm mr-2"
              onChange={handleYearChange}
            >
              <option value="">Year</option>
              {yearOptions}
            </select>

            <select
              className="dark:text-black w-36 rounded-sm"
              onChange={handleStatusChange}
            >
              <option value="">Launch Status</option>
              {statusOptions}
            </select>
          </form>
        </div>
      </div>
      {launchesData.length === 0 ? (
        <p className="mt-5 text-xl text-center">Record not found.</p>
      ) : (
        <div
          className="flex flex-col md:flex-row flex-wrap overflow-y-auto overscroll-auto scrollable"
          // onScroll={handleScrolling}
        >
          {renderLaunchCards}
        </div>
      )}
    </>
  );
};

export default Launches;
