import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchLaunch } from "../api/index";
import { formatFullDate } from "../utils/DateFormat";
import PreRocketCard from "../components/PreRocketCard";

const LaunchDetail = () => {
  const { id } = useParams();
  const [launchData, setLaunchData] = useState({});
  useEffect(() => {
    const fetchLaunchData = async () => {
      await fetchLaunch(id).then((res) => {
        setLaunchData(res);
      });
    };

    fetchLaunchData();
  }, [id]);

  return !launchData ? (
    "Finding this launch detail in the atmosphere ..."
  ) : (
    <div>
      <div className='mx-auto sm:w-full md:w-1/2 lg:w-1/2'>
        <p className='text-3xl font-bold mb-4'>{launchData.mission_name}</p>

        <div className='flex mb-4'>
          <div className='w-1/2'>
            <p className='text-sm font-light'>⏱ Launch on</p>
            <p>{formatFullDate(launchData.launch_date_unix)}</p>
          </div>
          <div className='w-1/2 text-right'>
            <p className='text-sm font-light'>🏗️ Launch at</p>
            <p>{launchData?.launch_site?.site_name_long}</p>
          </div>
        </div>

        <div className='mb-4'>
          <strong>
            <p class='text-xl font-bold mb-4'>⭐ Is this launch success?</p>
          </strong>
          <p>
            {`${launchData?.launch_success ? "Succeed" : "Failed"}, 
              ${launchData.details}`}
          </p>
        </div>

        <div className='mb-4'>
          <strong>
            <p class='text-xl font-bold mb-4'>
              🚀 Rocket model in this launch.
            </p>
          </strong>
          {/* Insert Rocket Component here @Icyscools */}
          {launchData?.rocket?.rocket_id ? (
            <PreRocketCard
              rocketId={launchData?.rocket?.rocket_id}
            ></PreRocketCard>
          ) : (
            ""
          )}
        </div>

        <div className='mb-4'>
          <strong>
            <p class='text-xl font-bold mb-4'>📷 Related images</p>
          </strong>
          {launchData?.links?.flickr_images?.length === 0 ? (
            "Sorry, This rocket may not have any capture images."
          ) : (
            <img src={launchData?.links?.flickr_images[0]} alt='' />
          )}
        </div>

        <div className='pb-8'>
          <strong>
            <p class='text-xl font-bold mb-4'>🔗 Related Resources</p>
          </strong>
          {launchData?.links?.article_link ? (
            <a
              className='text-sm text-lightblue underline mr-2'
              href={launchData?.links?.article_link}
            >
              Article
            </a>
          ) : (
            ""
          )}
          {launchData?.links?.video_link ? (
            <a
              className='text-sm text-lightblue underline mr-2'
              href={launchData?.links?.article_link}
            >
              YouTube
            </a>
          ) : (
            ""
          )}
          {launchData?.links?.wikipedia ? (
            <a
              className='text-sm text-lightblue underline'
              href={launchData?.links?.wikipedia}
            >
              Wikipedia
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default LaunchDetail;
