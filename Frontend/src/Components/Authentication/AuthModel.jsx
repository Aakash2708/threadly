import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SigninForm from "./SigninForm";
import SignUp from "./SignUp";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  outline: "none",
};

export default function AuthModel({ open, handleClose }) {
  const [isSignup, setIsSignup] = React.useState(false);

  // Toggle between Sign In and Sign Up
  const toggleAuthMode = () => setIsSignup((prev) => !prev);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
      <Box sx={style}>
        <h1 className="text-center font-bold text-3xl pb-10">
          {isSignup ? "Create Your Account" : "Sign In"}
        </h1>

        {isSignup ? <SignUp /> : <SigninForm />}

        <h1 className="text-center py-5 font-semibold text-lg text-gray-500">
          {isSignup ? "Already have an account?" : "Don't have an account? Sign up"}
        </h1>

        <Button
         fullWidth
          variant="outlined"
          sx={{ borderRadius: "29", py: "15px" }}
          onClick={toggleAuthMode}
        >
          {isSignup ? "Sign In" : "Sign Up"}
        </Button>
      </Box>
    </Modal>
  );
}
