import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender || "male");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const updateProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, photoUrl, gender },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {user && (
        <div className="flex justify-center my-5">
          <div className="flex justify-center items-center mx-5">
            <div className="card card-dash bg-base-300 w-96">
              <div className="card-body">
                <h2 className="card-title justify-center">Edit Profile</h2>
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">First Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <legend className="fieldset-legend">Last Name</legend>
                    <input
                      type="text"
                      className="input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <legend className="fieldset-legend">Photo URL</legend>
                    <input
                      type="text"
                      className="input"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                    <legend className="fieldset-legend">Age</legend>
                    <input
                      type="text"
                      className="input"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                    <legend className="fieldset-legend">Gender</legend>
                    <select
                      defaultValue={gender}
                      className="select"
                      onClick={(e) => setGender(e.target.value)}
                    >
                      <option>male</option>
                      <option>female</option>
                      <option>others</option>
                    </select>
                    <legend className="fieldset-legend">About</legend>
                    <textarea
                      className="textarea"
                      placeholder="About"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </fieldset>
                </div>
                <p className="text-red-500">{error}</p>
                <div className="card-actions justify-center">
                  <button className="btn btn-primary" onClick={updateProfile}>
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, about, gender }}
          />
        </div>
      )}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
