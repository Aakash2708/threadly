import React from "react";
import { navigationMenu } from "./NavigationMenu";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Store/Auth/Action";

const Navigation = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    dispatch(logout());
    handleClose();
  };

  // Debugging Logs (Remove them later)
  console.log("Auth Object:", auth);
  console.log("User Object:", auth.user);

  // Prevent error when fullname is undefined
  const username = auth.user?.fullname || "Guest User";
  const formattedUsername = username.split(" ").join("_").toLowerCase();

  return (
    <div className="h-screen sticky top-0">
      <div>
        <div className="py-5">
          <svg
            height="30"
            width="30"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1nao33i r-rxcuwo r-1777fci 
             r-m327ed r-494qqr"
          >
            <g>
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 
             2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              ></path>
            </g>
          </svg>
        </div>
        <div className="space-y-6">
          {navigationMenu.map((item) => (
            <div
              key={item.title}
              className="cursor-pointer flex space-x-3 items-center"
              onClick={() =>
                item.title === "Profile"
                  ? navigate(`/profile/${5}`)
                  : navigate(item.path)
              }
            >
              {item.icon}
              <p className="text-xl">{item.title}</p>
            </div>
          ))}
        </div>
        <div className="py-10">
          <Button
            sx={{
              width: "100%",
              borderRadius: "29px",
              py: "15px",
              bgcolor: "#1e88e5",
            }}
            variant="contained"
          >
            Tweet
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar
            alt={username}
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
          />
          <div>
            <p>{username}</p>
            <span className="opacity-70">@{formattedUsername}</span>
          </div>

          <Button
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon />
          </Button>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
