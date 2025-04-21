import { Button, Grid } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import AuthModel from "./AuthModel";

const Authentication = () => {
  const [openAuthModel, setOpenAuthModel] = useState(false);

  const handleOpenAuthModel = () => setOpenAuthModel(true);
  const handleCloseAuthModel = () => setOpenAuthModel(false);

  return (
    <div>
      <Grid container className="relative overflow-y-hidden">
        {/* Left Side */}
        <Grid item container lg={7} xs={12} className="hidden lg:flex relative">
          <img
            src="https://img.freepik.com/free-vector/geometric-gradient-futuristic-background_23-2149116406.jpg"
            className="w-full h-screen"
            alt="Background"
          />
          <div className="absolute top-[26%] left-[19%]">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-12 h-12 fill-white">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
        </Grid>

        {/* Right Side */}
        <Grid item lg={5} xs={12} className="px-10">
          <h1 className="mt-10 font-bold text-7xl">Happening Now</h1>
          <h1 className="font-bold text-3xl py-16">Join Twitter Today</h1>

          {/* Signup Section */}
          <div className="w-[60%]">
            <GoogleLogin width={330} />
            <p className="py-5 text-center">OR</p>

            <Button
              onClick={handleOpenAuthModel}
              fullWidth
              variant="contained"
              size="large"
              sx={{ borderRadius: "29px", py: "12px" }} // Increased padding
            >
              Create Account
            </Button>

            <p className="text-sm mt-2">
              By signing up, you agree to the Terms of Service and Privacy Policy, including Cookie Use.
            </p>
          </div>

          {/* Login Section */}
          <div className="mt-10 w-[60%]">
            <h1 className="font-bold">Already have an account?</h1>
            <Button
              onClick={handleOpenAuthModel}
              fullWidth
              variant="outlined"
              size="large"
              sx={{
                borderRadius: "29px",
                py: "12px", // Increased padding for a bigger button
                fontWeight: "bold", // Ensures text visibility
              }}
            >
              LOGIN
            </Button>
          </div>
        </Grid>
      </Grid>

      {/* Auth Modal */}
      <AuthModel open={openAuthModel} handleClose={handleCloseAuthModel} />
    </div>
  );
};

export default Authentication;
