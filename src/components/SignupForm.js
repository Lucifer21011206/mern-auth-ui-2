import { useState } from "react";
import React from "react";
import { Box, TextField, Button, Typography, Checkbox, FormControlLabel, Link, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    countryCode: "+1", // Default country code set to +1
    agree: false
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
  });
 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "phone" && !value.startsWith(formData.countryCode)) {
      // Ensure that phone number starts with selected country code
      setFormData({ ...formData, phone: formData.countryCode + value });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleCountryCodeChange = (e) => {
    const selectedCountryCode = e.target.value;
    setFormData({
      ...formData,
      countryCode: selectedCountryCode,
      phone: selectedCountryCode + formData.phone.slice(formData.countryCode.length) // Adjust phone number to keep the remaining part
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    console.log("Signup Data:", formData);
  };

  return (
    <Box width="80%" maxWidth="400px">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Create an Account
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Already have an account? <Link href="/login">Log in</Link>
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} variant="outlined" margin="normal" required />
        <TextField fullWidth label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} variant="outlined" margin="normal" required />
        <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} variant="outlined" margin="normal" required />
        
        <Box display="flex" alignItems="center" marginY={2}>
          {/* Country Code Dropdown */}
          <FormControl variant="outlined" sx={{ width: 100 }}>
            <InputLabel>Country Code</InputLabel>
            <Select
              value={formData.countryCode}
              onChange={handleCountryCodeChange}
              label="Country Code"
              name="countryCode"
            >
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
            sx={{ ml: 2 }}
          />
        </Box>

        <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} variant="outlined" margin="normal" required />
        <TextField fullWidth label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} variant="outlined" margin="normal" required />

        <FormControlLabel
          control={<Checkbox name="agree" checked={formData.agree} onChange={handleChange} />}
          label="I agree to the terms & conditions"
        />

        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
          Create Account
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
