import { useEffect, useState } from "react";
import instance from "../../utils/configAxios";
import { useParams } from "react-router";
import Spinner from "../Page/Spinner";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Reviews = ({ token }) => {
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await instance.post(
        `/tour/${id}/reviews`,
        { rating, review },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating(null);
      setReview("");
      console.log(response);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  }

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-blue-100 min-h-screen">
          <div className="max-w-md mx-auto mt-8 bg-white rounded-md shadow-lg p-6">
            <form onSubmit={handleSubmit}>
              <label htmlFor="rating" className="block mb-2">
                Rating
              </label>
              <input
                id="rating"
                type="number"
                value={rating}
                required
                onChange={(e) => setRating(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
              />
              <label htmlFor="review" className="block mb-2">
                Review
              </label>
              <textarea
                id="review"
                type="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4 focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={() => navigate(-1)}
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;

// useEffect(() => {
//   async function fetchData() {
//     const {
//       data: {
//         data: { data },
//       },
//     } = await instance.get(`/tour/${id}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const arr = [data];
//     console.log(arr);
//     setTour(arr);
//   }
//   fetchData();
// }, []);
