import { Button, Grid, TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useFormik } from "formik";
import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginUser } from "../../Store/Auth/Action";

// ✅ Improved validation messages
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: Yup.string()
    
    .required("Password is required"),
});

const SigninForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Prevent unnecessary re-renders using useCallback
 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values)=>
      {
        dispatch(loginUser(values))
        console.log("Form values", values);

      },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        {/* Email Field */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        {/* Password Field with Visibility Toggle */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Sign-in Button */}
        <Grid item xs={12}>
          <Button
            sx={{ borderRadius: "29px", py: "15px", bgcolor: blue[500] }}
            size="large"
            fullWidth
            variant="contained"
            type="submit"
           
          >
            Sign in
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SigninForm;
