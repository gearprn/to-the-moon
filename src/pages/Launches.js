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

  // when page load for the first time.
  useEffect(() => {
    const fetchLaunchesData = async () => {
      await fetchLaunches({ limit: 10, offset: 0 }).then((res) => {
        setLaunchesData(res);
      });
    };
    fetchLaunchesData();
  }, []);

  // for when offset change
  useEffect(() => {
    const isLaunchSuccess =
      launchStatus === '' ? '' : launchStatus === 'Success' ? true : false;

    const fetchLaunchesData = async () => {
      await fetchLaunches({
        rocketName: rocketName,
        launchYear: selectYear,
        launchSuccess: isLaunchSuccess,
        limit: 10,
        offset: offset,
      }).then((res) => {
        setLaunchesData([...launchesData, ...res]);
      });
    };
    fetchLaunchesData();
  }, [offset]);

  // for when rocketName, selectYear, launchStatus change
  useEffect(() => {
    const isLaunchSuccess =
      launchStatus === '' ? '' : launchStatus === 'Success' ? true : false;

    const fetchLaunchesData = async () => {
      await fetchLaunches({
        rocketName: rocketName,
        launchYear: selectYear,
        launchSuccess: isLaunchSuccess,
        limit: 10,
        offset: 0,
      }).then((res) => {
        setLaunchesData(res);
      });
    };
    fetchLaunchesData();
  }, [rocketName, launchStatus, selectYear]);

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
    setSelectYear(e.target.value);
  };

  const handleStatusChange = (e) => {
    setLaunchStatus(e.target.value);
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
      setOffset(offset + 10);
    }
  }, 120);

  return launchesData === '' ? (
    'fetching ...'
  ) : (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <h6 className="inline-block text-2xl mb-3 w-full md:w-auto md:mr-auto">
          🔥 Launches //
        </h6>
        <div className="flex flex-wrap items-center gap-3 sm:inline-block md:ml-auto">
          <form className="mx-2">
            <select
              className="dark:text-black rounded-sm mb-2 mr-2 w-full sm:w-36"
              onChange={handleRocketNameChange}
            >
              <option value="">Rocket Name</option>
              {rocketOptions}
            </select>

            <select
              className="dark:text-black rounded-sm mb-2 mr-2 w-full sm:w-36"
              onChange={handleYearChange}
            >
              <option value="">Year</option>
              {yearOptions}
            </select>

            <select
              className="dark:text-black rounded-sm mb-2 w-full sm:w-36"
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
          className="mt-2 flex flex-wrap h-screen overflow-y-auto overscroll-auto scrollable"
          onScroll={handleScrolling}
        >
          {renderLaunchCards}
        </div>
      )}
    </>
  );
};

export default Launches;
