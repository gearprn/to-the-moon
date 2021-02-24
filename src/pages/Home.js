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
    "Getting some whispers from Elon Musk..."
  ) : (
    <div className='mx-auto sm:w-full md:w-1/2 lg:w-1/3'>
      <section className='mb-4'>
        <h6 className='text-xl mb-3'>🛰 SpaceX //</h6>
        <p className='pl-5 mb-3 text-justify'>{info.summary}</p>
      </section>
      <section className='mb-4'>
        <h6 className='text-xl mb-3'>🏢 Headquarters //</h6>
        <p className='pl-5 mb-3'>{`${info?.headquarters?.address}, ${info?.headquarters?.city}, ${info?.headquarters?.state}`}</p>
      </section>
      <section className='mb-4'>
        <h6 className='text-xl mb-3'>🔗 Related Links //</h6>
        <p className='pl-5 mb-3'>
          <a
            className='text-sm text-lightblue underline mr-2'
            href={info?.links?.elon_twitter}
          >
            Elon Twitter
          </a>
          <a
            className='text-sm text-lightblue underline mr-2'
            href={info?.links?.flickr}
          >
            Flickr
          </a>
          <a
            className='text-sm text-lightblue underline mr-2'
            href={info?.links?.twitter}
          >
            Twitter
          </a>
          <a
            className='text-sm text-lightblue underline mr-2'
            href={info?.links?.website}
          >
            Website
          </a>
        </p>
      </section>
    </div>
  );
};

export default Home;
