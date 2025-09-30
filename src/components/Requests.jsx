import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="flex justify-center my-30">
        <h1 className="text-bold text-3xl text-white">No Requests Found</h1>
      </div>
    );
  return (
    <div className="text-center my-10 ">
      <div className="flex justify-center">
        <h1 className="text-bold text-3xl text-white">Connection Requests</h1>
      </div>

      {requests.map((request, index) => {
        const { _id, firstName, lastName, photoUrl, age, about, gender } =
          request;
        return (
          <div
            className="flex my-5 w-1/3 bg-base-300 m-4 p-4 rounded-lg mx-auto items-center"
            key={_id}
          >
            <div className="mx-5">
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-3">
              <h1 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h1>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="mx-5">
              <button
                className="btn btn-active btn-primary mx-5"
                onClick={() => reviewRequest("rejected", _id)}
              >
                Reject
              </button>
              <button
                className="btn btn-active btn-secondary"
                onClick={() => reviewRequest("accepted", _id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
