import { useState } from "react";
import React from "react";
import DialpadTwoToneIcon from '@mui/icons-material/DialpadTwoTone';
import {
  createTheme,
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  InputAdornment,
  Paper,
} from "@mui/material";
import axios from "axios";
import DriveFileRenameOutlineTwoToneIcon from "@mui/icons-material/DriveFileRenameOutlineTwoTone";
import MarkEmailReadTwoToneIcon from "@mui/icons-material/MarkEmailReadTwoTone";
import KeyTwoToneIcon from "@mui/icons-material/KeyTwoTone";

const SignupForm = () => {

  const theme = createTheme({
    typography: {
      fontFamily: "'Playfair Display', serif", // Apply Google Font
    },
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    countryCode: "+1", // Default country code set to +1
    agree: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agree: "",
  });

  const [backendError, setBackendError] = useState(""); // For backend validation errors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    setErrors({ ...errors, [name]: "" });
    setBackendError("");
  };

  const handleCountryCodeChange = (e) => {
    const selectedCountryCode = e.target.value;
    setFormData({
      ...formData,
      countryCode: selectedCountryCode,
      phone: selectedCountryCode + formData.phone.slice(formData.countryCode.length),
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\+\d{1,4}\d{7,14}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", formData);
      alert("Registration successful! You can now log in.");
    } catch (err) {
      setBackendError(err.response?.data?.msg || "Registration failed. Please try again.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="68vh" margin-top="20px" >
      {/* <Paper elevation={5} sx={{ padding: 3, marginLeft:1.5, marginRight:1.5,marginTop:1.5,marginBottom:1.5, borderRadius: 4, maxWidth: 420 }}> */}
        <Box>
          <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
            Create an Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
            Already have an account? <Link href="/login">Log in</Link>
          </Typography>

          {backendError && <Alert severity="error" sx={{ mb: 2 }}>{backendError}</Alert>}

          <form onSubmit={handleSubmit}>
          <TextField
   fullWidth
  label="First Name"
  name="firstName"
  value={formData.firstName}
  onChange={handleChange}
  error={!!errors.firstName}
  helperText={errors.firstName}
  variant="standard" // Removes the default box outline
  sx={{
    width: "100%", // Ensures responsiveness
    maxWidth: "340px",
    ml:5
  }}
  InputProps={{
    disableUnderline: false, // Keep the underline effect
    endAdornment: (
      <InputAdornment position="end">
        <DriveFileRenameOutlineTwoToneIcon color="action" />
      </InputAdornment>
    ),
  }}
/>

            <TextField theme={theme} fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} margin="normal" error={!!errors.lastName} helperText={errors.lastName} variant="standard"
             sx={{  width: "100%", // Ensures responsiveness
              maxWidth: "340px",
              ml:5,
              mt:2
            
          }}
             InputProps={{
              disableUnderline:false,
              endAdornment: (
                <InputAdornment position="end">
                  <DriveFileRenameOutlineTwoToneIcon color="action" />
                </InputAdornment>
              ),
            }}/>
            <TextField fullWidth label="Email"  name="email" type="email" value={formData.email} onChange={handleChange} margin="normal" error={!!errors.email} helperText={errors.email} variant="standard"
            sx={{  width: "100%", // Ensures responsiveness
              maxWidth: "340px",
              ml:5,
              mt:1.2
            }}
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MarkEmailReadTwoToneIcon color="action" />
                </InputAdornment>
              ),
            }} />

            <Box display="flex" gap={1}>
              <FormControl variant="standard" sx={{  width: "100%", // Ensures responsiveness
    maxWidth: "100px",
    ml:5,mt:1.2}}>
                <InputLabel></InputLabel>
                <Select value={formData.countryCode} onChange={handleCountryCodeChange}>
                  <MenuItem value="+91">+91</MenuItem>
                  <MenuItem value="+44">+44</MenuItem>
                  <MenuItem value="+1">+1</MenuItem>
                  <MenuItem value="+61">+61</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth sx={{ width: "100%", // Ensures responsiveness
    maxWidth: "192px",
    ml:5,mt:1.2}} label="Phone Number" name="phone" value={formData.phone.slice(formData.countryCode.length)} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} variant="standard"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <DialpadTwoToneIcon color="action" />
                  </InputAdornment>
                ),
              }} />
            </Box>

            <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} margin="normal" error={!!errors.password} helperText={errors.password} variant="standard"
            sx={{ width: "100%", // Ensures responsiveness
              maxWidth: "340px",
              ml:5,mt:2}}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyTwoToneIcon color="action" />
                </InputAdornment>
              ),
            }} />
            <TextField sx={{ width: "100%", // Ensures responsiveness
    maxWidth: "340px",
    ml:5,mt:1}} fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} margin="normal" error={!!errors.confirmPassword} helperText={errors.confirmPassword} variant="standard"
            
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyTwoToneIcon color="action" />
                </InputAdornment>
              ),
            }}/>

<Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
  <FormControlLabel
    control={
      <Checkbox
        name="agree"
        checked={formData.agree}
        onChange={handleChange}
        className="custom-checkbox"
      />
    }
    label="I agree to the terms & conditions"
    sx={{
      ml:-8.5,
      width: "100%", // Ensures responsiveness
      maxWidth: "400px", // Matches other input fields
      display: "flex",
      justifyContent: "center", // Centers content
    }}
  />
</Box>


            <Button
  variant="contained"
  color="primary"
  type="submit"
  fullWidth
  sx={{
    ml: 7,
    mt:2.8,
    maxWidth: "300px",
    width: "100%",
    borderRadius: 12,
    '&:hover': {
      backgroundColor: 'primary.dark', // Adjust the color when hovered
      boxShadow: 3, // Add a nice shadow on hover
      transform: 'scale(0.90)', // Slightly enlarge the button for a more dynamic effect
      transition: 'all 0.3s ease', // Smooth transition
    },
  }}
>
  Create Account
</Button>

          </form>
        </Box>
      {/* </Paper> */}
    </Box>
  );
};

export default SignupForm;
