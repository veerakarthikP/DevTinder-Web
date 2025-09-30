import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log("ERROR: ", err.message);
    }
  };

  useEffect(() => {
    // if (!feed) {
    //   fetchFeed();
    // }
    fetchFeed();
  }, []);

  if (!feed) return;

  console.log("feed", feed);

  if (feed.length === 0) {
    return (
      <div className="flex justify-center my-30">
        <h1 className="text-bold text-3xl text-white">No New Users Found!</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-8">
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
