import React, { useState } from "react";
import RepeatIcon from "@mui/icons-material/Repeat";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import BarChartIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyModel from "../HomeSection/ReplyModel";
import { useDispatch } from "react-redux";
import { createReTweet,  likeTweet } from "../../Store/Twit/Action";

const TweetCard = ({item}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openReplyModel, setOpenReplyModel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenReplyModel = () => setOpenReplyModel(true);
  const handleCloseReplyModel = () => setOpenReplyModel(false);
  const handleLikeTweet = () =>dispatch(likeTweet(item.id));
  const handleDeleteTweet = () => {
    console.log("Delete Tweet");
    handleClose();
  };
  const handleCreateTweet = () => dispatch(createReTweet(item.id));
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <React.Fragment>
      <div className="flex space-x-5">
        <Avatar
          className="cursor-pointer"
          onClick={() => navigate(`/profile/${item?.user.id}`)}
          alt="username"
          src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
        />
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex cursor-pointer items-center space-x-2">
              <span className="font-semibold">{item?.user?.fullName}</span>
              <span className="text-gray-600">{item?.user?.fullName.split(" ").join(_).toLowerCase()}</span>
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
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={handleDeleteTweet}>Delete</MenuItem>
                <MenuItem onClick={handleDeleteTweet}>Edit</MenuItem>
              </Menu>
            </div>
          </div>
          <div className="mt-2 ">
            <div
              onClick={() => navigate(`/tweet/${item?.id}`)}
              className="cursor-pointer "
            >
              <p className="mb-2 p-0">
                {item?.content}
              </p>
              <img
                src={item?.image}
              />
            </div>

            <div className="py-5 flex flex-wrap justify-between items-center">
              <div className="space-x-3 flex items-center text-gray-600">
                <ChatBubbleOutlineIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>{item?.totalReplies}</p>
              </div>
              <div className={`${ item?.retwit ? "text-pink-600 " : "text-grey-600}" }
              space-x-3 flex items-center`}>
                <RepeatIcon
                  className="cursor-pointer"
                  onClick={handleCreateTweet}
                />
                <p>{item?.totalRetweets}</p>
              </div>
              <div
                className={`${
                  item?.liked ? "text-pink-600" : "text-gray-600"
                } space-x-3`}
              >
                {item?.liked ? (
                  <FavoriteIcon
                    className="cursor-pointer"
                    onClick={handleLikeTweet}
                  />
                ) : (
                  <FavoriteBorderIcon
                    className="cursor-pointer"
                    onClick={handleLikeTweet}
                  />
                )}
                <p>{item?.totalLikes}</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <BarChartIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
                <p>430</p>
              </div>
              <div className="space-x-3 flex items-center text-gray-600">
                <FileUploadIcon
                  className="cursor-pointer"
                  onClick={handleOpenReplyModel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <ReplyModel item={item} open={openReplyModel} handleClose={handleCloseReplyModel} />
      </section>
    </React.Fragment>
  );
};

export default TweetCard;
