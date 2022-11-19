import React from "react";
import Tuits from "../tuits";
import { Link } from "react-router-dom";
import * as service from "../../services/auth-service"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MyTuits from "./my-tuits";
import { Routes, Route } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  useEffect(async () => {
    try {
      const user = await service.profile();
      setProfile(user);
    } catch (e) {
      navigate('/login');
    }
  }, []);
  const logout = () => {
    service.logout()
      .then(() => navigate('/login'));
  }
  return (
    <div>
      <h4>{profile.username}</h4>
      <h6>@{profile.username}</h6>
      <button onClick={logout}>
        Logout</button>
      <div>
        <MyTuits />
      </div>
    </div>
  );
};
export default Profile;