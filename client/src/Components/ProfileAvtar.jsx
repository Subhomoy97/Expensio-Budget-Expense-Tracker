import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { getProfile } from "../Api/functions/profileFunction";

const ProfileAvtar = () => {
  const [auth, setAuth,] = useAuth();
  const [loading, setLoading] = useState(true);
   const [profileData, setProfileData] = useState({})
   useEffect(()=>{
    getProfile(setProfileData,setLoading)
   },[])
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    Cookies.remove("auth");
    Cookies.remove("token");
    toast.success("successfully logout");
    navigate("/login");
  };
  return (
    <>
      <Dropdown align="end">
        <Dropdown.Toggle
          as="div"
          style={{ cursor: "pointer" }}
          id="dropdown-custom-components"
        >
          <img
            src={profileData.profilePic}
            alt="user"
            style={{ width: "40px", height: "40px", cursor: "pointer" }}
            className="rounded-circle"
          />
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/profile">
            My Profile
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/update-password">
            Update Password
          </Dropdown.Item>
          {/* <Dropdown.Item as={Link} to="/settings">
            Settings
          </Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ProfileAvtar;
