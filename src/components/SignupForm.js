import { useState } from "react";
import React from "react";
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link, Select, MenuItem, InputLabel, FormControl, Alert } from "@mui/material";
import axios from "axios";

const SignupForm = () => {
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
    if (name === "phone" && !value.startsWith(formData.countryCode)) {
      // Ensure that phone number starts with selected country code
      setFormData({ ...formData, phone: formData.countryCode + value });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
    // Clear errors when the user starts typing
    setErrors({ ...errors, [name]: "" });
    setBackendError("");
  };

  const handleCountryCodeChange = (e) => {
    const selectedCountryCode = e.target.value;
    setFormData({
      ...formData,
      countryCode: selectedCountryCode,
      phone: selectedCountryCode + formData.phone.slice(formData.countryCode.length), // Adjust phone number to keep the remaining part
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\+\d{1,4}\d{7,14}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
      isValid = false;
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    }

    // Confirm Password validation
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Terms and Conditions validation
    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms and conditions";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      console.log("Registration successful:", response.data);
      alert("Registration successful! You can now log in.");
      // Optionally, redirect the user to the login page
    } catch (err) {
      console.error("Registration failed:", err.response?.data);
      setBackendError(err.response?.data?.msg || "Registration failed. Please try again.");
    }
  };

  return (
    <Box width="80%" maxWidth="400px">
      <Typography variant="h5" marginLeft="102px"
      marginTop="15px" fontWeight="bold" mb={2}>
        Create an Account
      </Typography>
      <Typography marginLeft="104px" variant="body2" color="text.secondary" mb={3}>
        Already have an account? <Link href="/login">Log in</Link>
      </Typography>

      {backendError && <Alert severity="error" sx={{ mb: 2 }}>{backendError}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          sx={{marginLeft:"44px"}}
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          variant="outlined"
          // margin="normal"
          required
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
        sx={{marginLeft:"44px"}}
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
        sx={{marginLeft:"44px"}}
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          error={!!errors.email}
          helperText={errors.email}
        />

        <Box display="flex" alignItems="center" marginY={2} sx={{marginLeft:"44px"}}>
          {/* Country Code Dropdown */}
          <FormControl variant="outlined" sx={{ width: 100 }}>
            <InputLabel>Country Code</InputLabel>
            <Select value={formData.countryCode} onChange={handleCountryCodeChange} label="Country Code" name="countryCode">
              <MenuItem value="+1">+1 (USA)</MenuItem>
              <MenuItem value="+44">+44 (UK)</MenuItem>
              <MenuItem value="+91">+91 (India)</MenuItem>
              <MenuItem value="+61">+61 (Australia)</MenuItem>
            </Select>
          </FormControl>

          {/* Phone Number */}
          <TextField
          
            fullWidth
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone.slice(formData.countryCode.length)} // Remove country code from display
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            sx={{ ml: 2 ,marginLeft:"44px"}}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Box>

        <TextField
        sx={{marginLeft:"44px"}}
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
        sx={{marginLeft:"44px"}}
          fullWidth
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <FormControlLabel
          control={<Checkbox fullWidth
            sx={{marginLeft:"40px"}}
            name="agree" checked={formData.agree} onChange={handleChange} />}
          label="I agree to the terms & conditions"
        />
        {errors.agree && <Typography color="error" variant="body2">{errors.agree}</Typography>}

        <Button variant="contained" color="primary"  type="submit" sx={{ mt: 2 ,ml:13, mb: 3, borderRadius:"50px" ,width: "200px" }}>
          Create Account
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
