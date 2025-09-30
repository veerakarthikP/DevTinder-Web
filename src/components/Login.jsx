import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [emailId, setEmailId] = useState("veera@gmail.com");
    const [password, setPassword] = useState("Veera@123");
    const [error, setError] = useState("")

    const logIn = async() => {
        try {
            const res = await axios.post(BASE_URL + '/login', {emailId, password}, {withCredentials: true})
            dispatch(addUser(res.data.data));
            navigate('/');
        } catch(err) {
            setError(err?.response?.data || 'Something went wrong')
        }
    }

    return (
        <div className="flex justify-center items-center my-20">
            <div className="card card-dash bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Email ID</legend>
                            <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)}/>
                            <legend className="fieldset-legend">Password</legend>
                            <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </fieldset>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={logIn}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login