import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageIcon from "@mui/icons-material/Image";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTweetReply } from '../../Store/Twit/Action';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius:"2.5%",
  boxShadow: 24,
  p: 4,
  outline:'none',
  
};

export default function ReplyModel({handleClose,open,item}) {
 
  const dispatch = useDispatch()
  const navigate =useNavigate();
    

  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState("");
  
  const handleSubmit=(values)=>{
  console.log("handle Submit ",values)
   dispatch(createTweetReply(values))
   handleClose()
  }

  const handleSelectImage = (event) => {
    setUploadingImage(true);
    const imgUrl = event.target.files[0];
    formik.setFieldValue("image", imgUrl);
    setSelectedImage(URL.createObjectURL(imgUrl)); // Show preview
    setUploadingImage(false);
  };
  const formik = useFormik(
    {
      initialValues:{
        content:"",
        image:"",
        tweetId:item?.id,

      },
      onSubmit:handleSubmit
    }
  )

  return (
    <div >
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
           
          </div>
          <div className="mt-2 cursor-pointer">
            <p onClick={()=>navigate(`/tweet/${3}`)} className="mb-2">
            Nice DP+</p>
            
          </div>
        
        </div>
       
      </div>
      <section className="pb-10 py-10">
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
        </Box>
      </Modal>
    </div>
  );
}