import { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <Box width="80%" maxWidth="400px">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Welcome Back
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Don't have an account? <Link href="/signup">Sign Up</Link>
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleChange} variant="outlined" margin="normal" required />
        <TextField fullWidth label="Password" name="password" type="password" value={formData.password} onChange={handleChange} variant="outlined" margin="normal" required />
        
        <Link href="#" variant="body2" display="block" textAlign="right" mb={2}>
          Forgot Password?
        </Link>

        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
