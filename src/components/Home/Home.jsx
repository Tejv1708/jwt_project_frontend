import { useEffect, useState } from "react";
import instance from "../../utils/configAxios";
import { Link } from "react-router-dom";
import Spinner from "../Page/Spinner";
import Navbar from "./Navbar";

const Home = () => {
  const [tour, setTour] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await instance.get("/tour");
        setTour(data.data.doc);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="bg-blue-100">
            <div className="container mx-auto px-4 flex justify-center items-center flex-col mt-10">
              {tour.map((data) => (
                <ul className="mt-10 " key={data.id}>
                  <li>
                    <Link
                      to={`/${data.id}`}
                      className="text-black hover:text-blue-900"
                    >
                      {data.name}
                    </Link>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
