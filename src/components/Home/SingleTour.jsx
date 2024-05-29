import React, { useEffect, useState } from "react";
import instance from "../../utils/configAxios";
import { useParams } from "react-router";
import moment from "moment/moment";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Spinner from "../Page/Spinner";

const SingleTour = ({ token }) => {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [error, setError] = useState(false);

  const settings = {
    dots: true,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: {
            data: { data },
          },
        } = await instance.get(`/tour/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTour([data]);
        setLoading(false);
        console.log(token);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {!token ? (
        <p className="text-center mt-4">
          You have to login again your{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      ) : loading ? (
        <Spinner />
      ) : (
        <div className="bg-blue-100 text-gray-900 min-h-screen py-10">
          {tour.map((data) => (
            <div key={data.id} className="container mx-auto px-4">
              <div className="flex flex-col items-center justify-center">
                <h1 className="mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl">
                  {data.name}
                </h1>
                <p className="font-bold">Price: {data.price}</p>
                <p className="font-bold">Max Group Size: {data.maxGroupSize}</p>
                <p>{data.description}</p>
              </div>
              <div className="mt-10">
                <h1 className="font-extrabold text-3xl mb-7">Starting Dates</h1>
                <ul className="flex flex-wrap gap-4">
                  {data.startDates.map((date) => (
                    <li key={date}>
                      {moment.utc(date).format("h:mm:ss a, MMMM Do YYYY")}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-3/4 mx-auto mt-20">
                <h1 className="font-extrabold text-3xl mb-7">Reviews</h1>
                <Slider {...settings}>
                  {data.reviews.map((review) => (
                    <div key={review.id} className="p-5 rounded-lg bg-gray-200">
                      <h1 className="text-lg font-bold mb-2">
                        {review.user.name}
                      </h1>
                      <p>{review.review}</p>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-10">
            <Link to={`/${id}/reviews`}>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create a review
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleTour;
