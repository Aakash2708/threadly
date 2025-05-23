import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Button, Tab, Tabs } from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TweetCard from "../HomeSection/TweetCard";
import ProfileModel from "./ProfileModel";
import { authReducer } from "../../Store/Auth/Reducer";
import { useDispatch, useSelector } from "react-redux";
import { findTwitsById } from "../../Store/Twit/Action";
import { followUSerAction } from "../../Store/Auth/Action";

const Profile = () => {
  const disaptch = useDispatch()
  const {id}= useParams();
  const [tabValue, setTabValue] = useState("1");
  const navigate = useNavigate();
  const [openProfileModel, setOpenProfileModel] = useState(false);
  
  const handleOpenProfileModel = () => setOpenProfileModel(true);
  
  const {auth} = useSelector(store=>store)

  const handleBack = () => {
    navigate(-1);
    console.log("Handling Back Button in Profile");
  };
  
  const handleFollowUser = () => {
    disaptch(followUSerAction(id))
    console.log("Follow User Button");
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === "4") {
      console.log("Likes Tweet");
    } else if (newValue === "1") {
      console.log("User's Tweet");
    }
  };
  
 useEffect(()=>{
  disaptch(findTwitsById(id))
 },[id])
  return (
    <div>
      <section className="bg-white z-50 flex items-center sticky top-0 bg-opacity-95">
        <KeyboardBackspaceIcon className="cursor-pointer" onClick={handleBack} />
        <h1 className="py-5 text-xl font-bold opacity-90 ml-5">Profile</h1>
      </section>
      <section>
        <img
          className="w-[100%] h-[15rem] object-cover"
          src="https://cdn.pixabay.com/photo/2022/08/01/20/49/boat-7359002_1280.jpg"
          alt="Cover"
        />
      </section>
      <section className="pl-6">
        <div className="flex justify-between items-start mt-5 h-[5rem]">
          <Avatar
            className="transform -translate-y-24"
            alt="Profile Picture"
            src={auth.findUser?.image}
            sx={{ width: "10rem", height: "10rem", border: "4px solid white" }}
          />

          {auth.findUser?.req_user ?(<Button
            onClick={handleOpenProfileModel}
            className="rounded-full"
            variant="contained"
            sx={{ borderRadius: "20px" }}
          >
            Edit Profile 
          </Button>):
          (<Button
            onClick={handleFollowUser}
            className="rounded-full"
            variant="contained"
            sx={{ borderRadius: "20px" }}
          >
            Edit Profile 
          </Button>)
          }
          
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="font-bold text-lg">
              {auth.findUser?.userName}
            </h1>
            <img
              className="ml-2 w-5"
              src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
              alt="Verified"
            />
          </div>
          <h1 className="text-gray-500"> @{auth.findUser?.fullName.split(" ").join("_").toLowerCase()}</h1>
        </div>
        <div className="mt-2 space-y-3">
          <p>
            {auth.findUser?.bio}
          </p>
          <div className="py-1 flex space-x-5">
            <div className="flex items-center text-gray-500">
              <BusinessCenterIcon />
              <p className="ml-2">Education</p>
            </div>
            <div className="flex items-center text-gray-500">
              <CalendarMonthIcon />
              <p className="ml-2">Joined Jun 2022</p>
            </div>
            <div className="flex items-center text-gray-500">
              <LocationOnIcon />
              <p className="ml-2">{auth.findUser?.location}</p>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followings?.length}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex items-center space-x-1 font-semibold">
              <span>{auth.findUser?.followers?.length}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList onChange={handleTabChange} aria-label="Profile Tabs">
                <Tab label="Tweets" value="1" />
                <Tab label="Replies" value="2" />
                <Tab label="Media" value="3" />
                <Tab label="Likes" value="4" />
              </TabList>
            </Box>
            <TabPanel value="1">{[1, 1, 1].map((item, index) => <TweetCard key={index} />)}</TabPanel>
            <TabPanel value="2">Users Reply</TabPanel>
            <TabPanel value="3">Media</TabPanel>
            <TabPanel value="4">Likes</TabPanel>
          </TabContext>
        </Box>
      </section>
      <section>
        <ProfileModel handleClose={() => setOpenProfileModel(false)} open={openProfileModel} />
      </section>
    </div>
  );
};

export default Profile;