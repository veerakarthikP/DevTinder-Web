import React, { useEffect } from 'react';
import {BASE_URL} from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const fetchFeed = async() => {
    try {
      const res = await axios.get(BASE_URL + '/feed', {withCredentials: true});
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.log('ERROR: ', err.message)
    }
  }

  useEffect(() => {
    if (!feed) {
      fetchFeed();
    }
  }, [])

  return (
    <div className="flex justify-center my-8">
        {feed && <UserCard user={feed[0]}/>}
    </div>
  )
}

export default Feed