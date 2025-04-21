import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

export default function SubscriptionModel({open,handleClose}) {
 
  const [plan, setPlan] = React.useState("Annually");

  const fetures = [
    "Priotized your ranking in conversation and search ",
    "See aprroximately twice as many tweets ads in your for you and your following timelines",
    "Add bold and italic text in your tweest ",
    "Post Longer videos and 1080p videos uploads ",
    "All the exisiting Blue Features , including Edit Tweet ,Bookmark Folder and early acces to new features",
  ];
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex items-center space-x-3">
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </div>
          <div className="flex justify-center py-10">
            <div className="w-[80%] space-y-10">
              <div className="py-5 rounded-md flex items-center justify-between bg-slate-400 shadow-lg">
                <h1 className="text-xl pr-5">
                  Blue subscriber with a verified phone number will get a blue
                  checkmark once approved.
                </h1>
                <img
                  className="w-24 h-24"
                  src="https://abs.twimg.com/responsive-web/client-web/verification-card-v2@3x.8ebee019.png"
                  alt="Verification badge"
                />
              </div>

              <div className="flex justify-between rounded-full px-5 py-3 border bg-gray-500">
                <div>
                  <span
                    onClick={() => setPlan("Annually")}
                    className={`cursor-pointer ${
                      plan === "Annually" ? "text-black" : "text-gray-400"
                    }`}
                  >
                    Annually
                  </span>
                  <span className="text-green-500 text-sm ml-5">Save 12%</span>
                </div>
                <div>
                  <p
                    onClick={() => setPlan("Monthly")}
                    className={`cursor-pointer ${
                      plan === "Monthly" ? "text-black" : "text-gray-400"
                    }`}
                  >
                    Monthly
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {fetures.map((item) => (
                  <div className="flex items-center space-x-5">
                    <FiberManualRecordIcon
                      sx={{ width: "7px", height: "7px" }}
                    />
                    <p className="text-xs">{item}</p>
                  </div>
                ))}
              </div>
              <div className="cursor-pointer flex justify-center bg-gray-900  text-white rounded-full px-5 py-3">
              <span className="line-through italic">₹78,00.00</span>
              <span className="px-5"> ₹6,800.00</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
