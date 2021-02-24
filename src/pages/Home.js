import React, { useEffect, useState } from 'react';
import { fetchInfos } from '../api/index';

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
    'fetching'
  ) : (
    <div className="mx-auto sm:w-full md:w-1/2 lg:w-1/3">
      <strong>
        <h6 className="text-xl mb-3">🛰 SpaceX //</h6>
      </strong>
      <p className="pl-3 mb-3 text-justify">{info.summary}</p>

      <strong>
        <h6 className="text-xl mb-3">🏢 Headquarters //</h6>
      </strong>
      <p className="pl-3 mb-3">{`${info?.headquarters?.address}, ${info?.headquarters?.city}, ${info?.headquarters?.state}`}</p>

      <strong>
        <h6 className="text-xl mb-3">🔗 Related Links //</h6>
      </strong>
      <a
        className="text-sm text-lightblue underline mr-2"
        href={info?.links?.elon_twitter}
      >
        Elon Twitter
      </a>
      <a
        className="text-sm text-lightblue underline mr-2"
        href={info?.links?.flickr}
      >
        Flickr
      </a>
      <a
        className="text-sm text-lightblue underline mr-2"
        href={info?.links?.twitter}
      >
        Twitter
      </a>
      <a
        className="text-sm text-lightblue underline mr-2"
        href={info?.links?.website}
      >
        Website
      </a>
    </div>
  );
};

export default Home;
