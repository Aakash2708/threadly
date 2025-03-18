import React from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";

const TweetCard = () => {
  const navigate = useNavigate();

  const handleLikeTweet = () => {
    console.log("Handle Like Tweet");
  };

  const handleDeleteTweet = () => {
    console.log("Delete Tweet");
    handleClose();
  };

  const handleCreateTweet = () => {
    console.log("Create Tweet");
  };

  const handleOpenReplyModal = () => {
    console.log("Open Modal");
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="">
      <div className="flex space-x-5">
        <Avatar
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${6}`)}
          alt="username"
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">Raam</span>
              <span className="text-grey-600">@Raam1235</span>
              <img
                className="ml-2 w-5"
                src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee01a.png"
                alt="Verified"
              />
            </div>
            <div>
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
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2 cursor-pointer">
            <p className="mb-2">Nice DP+</p>
            <img
              className="w-[20rem] border-grey-400 rounded-md"
              src="https://imgs.data:image/png;base64,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.brave.com/VaBFCzD2r--5GdecPtHPp8DZ6WsCq3uhyFyAYBIPVxs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cuaGVsbG8td29ybGQuY29tL2ltYWdlcy9zbGlkZXMvRW5nbGlzaC1oZWxsby5wbmc"
              alt="Tweet"
            />
          </div>
          <div className="py-5 flex flex-wrap justify-between items-center">
            <div className="space-x-3 flex items-center text-gray-600">
              <ChatBubbleOutlineIcon
                className="cursor-pointer"
                onClick={handleOpenReplyModal}
              />
              <p>43</p>
            </div>
            <div className="space-x-3 text-grey-600 flex items-center">
              <RepeatIcon className="cursor-pointer" onClick={handleCreateTweet} />
              <p>54</p>
            </div>
            <div className={`${true ? "text-pink-600" : "text-grey-600"} space-x-3`}>
              {true ? (
                <FavoriteIcon className="cursor-pointer" onClick={handleLikeTweet} />
              ) : (
                <FavoriteBorderIcon className="cursor-pointer" onClick={handleLikeTweet} />
              )}
            </div>
            <div className="space-x-3 flex items-center text-gray-600">
              <BarChartIcon className="cursor-pointer" onClick={handleOpenReplyModal} />
              <p>430</p>
            </div>
            <div className="space-x-3 flex items-center text-gray-600">
              <FileUploadIcon className="cursor-pointer" onClick={handleOpenReplyModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;
