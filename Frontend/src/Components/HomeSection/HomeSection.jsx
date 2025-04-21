import { Avatar, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import TweetCard from "./TweetCard";
import { useDispatch, useSelector } from "react-redux";
import { createTweet, getAllTweets } from "../../Store/Twit/Action";


const HomeSection = () => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch= useDispatch()
  const {twit} = useSelector(store=>store)
  console.log(twit.twits)

  const validationSchema = Yup.object().shape({
    content: Yup.string().required("Tweet is required"),
  });

  const handleSubmit = (values,actions) => {
    dispatch(createTweet(values));
    actions.resetForm();
    console.log("values", values);
    setSelectedImage(null)
  };

  useEffect(()=>{
    dispatch(getAllTweets())

  },[twit.like,twit.retwit])


  const formik = useFormik({
    initialValues: {
      content: "",
      image: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });

  const handleSelectImage = async  (event) => {
    setUploadingImage(true);
    const imgUrl = await uploadToCloudinary(event.target.files[0]);
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(URL.createObjectURL(imgUrl)); // Show preview
    setUploadingImage(false);
  };

  return (
    <div className="space-y-5">
      <section>
        <h1 className="py-5 text-xl font-bold opacity-90">Home</h1>
      </section>
      <section className="pb-10">
        <div className="flex space-x-5">
          <Avatar
            alt="username"
            src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
          />
          <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="What is happening?"
                  className="border-none outline-none text-xl bg-transparent w-full"
                  {...formik.getFieldProps("content")}
                />
                {formik.touched.content && formik.errors.content && (
                  <span className="text-red-500">{formik.errors.content}</span>
                )}
              </div>
              {selectedImage && (
                <div className="mt-3">
                  <img
                    src={selectedImage}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex justify-between items-center mt-5">
                <div className="flex space-x-5 items-center">
                  <label className="flex items-center space-x-2 rounded-md cursor-pointer">
                    <ImageIcon className="text-[#1d9bf0]" />
                    <input
                      type="file"
                      name="imageFile"
                      className="hidden"
                      onChange={handleSelectImage}
                    />
                  </label>
                  <FmdGoodIcon className="text-[#1d9bf0]" />
                  <TagFacesIcon className="text-[#1d9bf0]" />
                </div>
                <Button
                  sx={{
                    borderRadius: "20px",
                    paddingy: "8px",
                    paddingx: "20px",
                    bgcolor: "#1e88e5",
                  }}
                  variant="contained"
                  type="submit"
                >
                  Tweet
                </Button>
              </div>
            </form>
            
          </div>
        </div>
      </section>
      <section>
       {twit.twits.map((items)=>  <TweetCard item={item} /> )} 
      </section>

    </div>
  );
};

export default HomeSection;
