import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchRocket } from "../api/index";

const RocketDetail = () => {
  const { rocketId } = useParams();
  const [rocketData, setRocketData] = useState();

  useEffect(() => {
    const fetchRocketData = async () => {
      await fetchRocket(rocketId).then((res) => setRocketData(res));
    };

    fetchRocketData();
  }, [rocketId]);

  return !rocketData ? (
    "Finding this rocket manual from the manual-shelf..."
  ) : (
    <div>
      <div className='mx-auto sm:w-full md:w-1/2 lg:w-1/2'>
        <p className='text-3xl font-bold mb-4'>{rocketData.rocket_name}</p>
        <p className='text-base mb-4'>{rocketData.description}</p>

        <div className='flex mb-4'>
          <div className='w-1/2'>
            <p className='text-sm font-light'>🔧 Manufactured by</p>
            <p>{rocketData?.company}</p>
          </div>
          <div className='w-1/2 text-right'>
            <p className='text-sm font-light'>🏗 Built in</p>
            <p>{rocketData?.country}</p>
          </div>
        </div>

        <div className='flex mb-4'>
          <div className='w-1/2'>
            <p className='text-sm font-light'>💡 Is it active?</p>
            <p>{rocketData?.active ? "Active" : "Inactive"}</p>
          </div>
        </div>

        <div className='mb-4'>
          <strong>
            <p class='text-xl font-bold mb-4'>🚀 Rocket overviews</p>
          </strong>

          <div className='flex mb-2'>
            <div className='w-1/2'>
              <p>Height</p>
            </div>
            <div className='w-1/2 text-right'>
              <p>
                {`${rocketData?.height?.meters ?? "..."} m.`}{" "}
                <span className='text-gray-175'>
                  / {`${rocketData?.height?.feet ?? "..."} ft.`}
                </span>
              </p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div className='w-1/2'>
              <p>Diameter</p>
            </div>
            <div className='w-1/2 text-right'>
              <p>
                {`${rocketData?.diameter?.meters ?? "..."} m.`}{" "}
                <span className='text-gray-175'>
                  / {`${rocketData?.diameter?.feet ?? "..."} ft.`}
                </span>
              </p>
            </div>
          </div>

          <div className='flex mb-2'>
            <div className='w-1/2'>
              <p>Mass</p>
            </div>
            <div className='w-1/2 text-right'>
              <p>
                {`${rocketData?.mass?.kg ?? "..."} kg.`}{" "}
                <span className='text-gray-175'>
                  / {`${rocketData?.mass?.lb ?? "..."} lb.`}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className='mb-4'>
          <strong>
            <p class='text-xl font-bold mb-4'>📷 Related images</p>
          </strong>

          {rocketData?.flickr_images?.length === 0 ? (
            <p class='text-base'>
              Sorry, This rocket may not have any capture images.
            </p>
          ) : (
            <div className='flex flex-wrap w-full gap-3 justify-start'>
              {rocketData.flickr_images.map((img, index) => (
                <img
                  src={img}
                  key={index}
                  alt=''
                  className='rounded-md shadow-md w-1/4 max-w-sm md:max-w-md'
                />
              ))}
            </div>
          )}
        </div>

        <div className='pb-8'>
          <strong>
            <p class='text-xl font-bold mb-4'>🔗 Related Resources</p>
          </strong>

          {rocketData?.wikipedia ? (
            <a
              className='text-sm underline'
              href={rocketData?.links?.wikipedia}
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

export default RocketDetail;
