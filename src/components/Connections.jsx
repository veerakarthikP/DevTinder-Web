import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <div className="flex justify-center my-30">
        <h1 className="text-bold text-3xl text-white">Connections</h1>
      </div>
    );

  return (
    <div className="text-center my-10 ">
      <div className="flex justify-center">
        <h1 className="text-bold text-3xl text-white">Connections</h1>
      </div>

      {connections.map((connection, index) => {
        const { _id, firstName, lastName, photoUrl, age, about, gender } =
          connection;
        return (
          <div
            className="flex my-5 w-1/3 bg-base-300 m-4 p-4 rounded-lg mx-auto"
            key={index}
          >
            <div className="mx-5">
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4">
              <h1 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h1>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
