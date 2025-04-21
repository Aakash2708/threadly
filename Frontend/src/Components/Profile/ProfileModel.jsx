import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { Avatar, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // ✅ Fixed duplicate import
import { updateUserProfile } from "../../Store/Auth/Action";
import uploadToCloudinary from "../../Utils/uploadToCloudnary";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
  borderRadius: 4,
};

export default function ProfileModel({ open, handleClose }) {
  const [uploading, setUploading] = useState(false);
  const auth = useSelector(state => state.auth); // ✅ Fixed destructuring
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null); // ✅ Fixed typo in useState

  const handleImageChange = async (event) => {
    setUploading(true);
    const file = await uploadToCloudinary(event.target.files[0]);
    setSelectedImage(file);
    formik.setFieldValue(event.target.name, file);
    setUploading(false);
  };

  const handleSubmit = (values) => {
    dispatch(updateUserProfile(values));
    console.log("Form Submitted:", values);
  };

  const formik = useFormik({
    initialValues: {
      fullName: auth.user?.fullName || "",  // Prefill user data if available
      website: auth.user?.website || "",
      location: auth.user?.location || "",
      bio: auth.user?.bio || "",
      backgroundImage: auth.user?.backgroundImage || "",
      image: auth.user?.image || "",
    },
    onSubmit: handleSubmit,
  });

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <p>Edit Profile</p>
            </div>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Save"}
            </Button>
          </div>

          {/* Modal Content */}
          <div className="hideScrollBar overflow-y-scroll overflow-x-hidden h-[80vh]">
            <div className="w-full">
              {/* Background Image */}
              <div className="relative">
                <img
                  className="w-full h-[12rem] object-cover object-center"
                  src={formik.values.backgroundImage || "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"}
                  alt="Background"
                />
                <input
                  type="file"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  name="backgroundImage"
                />
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="w-full transform -translate-y-20 ml-4 h-[6rem]">
              <div className="relative">
                <Avatar
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    border: "10px solid white",
                  }}
                  src={selectedImage || formik.values.image}
                />
                <input
                  className="absolute top-0 left-0 w-[10rem] h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                  name="image"
                  type="file"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3">
              <TextField
                fullWidth
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                id="bio"
                name="bio"
                label="Bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />

              <TextField
                fullWidth
                id="website"
                name="website"
                label="Website"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />

              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />

              <div className="my-3">
                <p className="text-lg">Birth Date . Edit</p>
                <p className="text-2xl">Aug 27 2001</p>
              </div>

              <p className="py-3 text-lg">Edit Professional Profile</p>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
