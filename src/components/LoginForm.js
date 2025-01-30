import { useState } from "react";
import { Box, TextField, Button, Typography, Link, InputAdornment } from "@mui/material";
import MarkEmailReadTwoToneIcon from "@mui/icons-material/MarkEmailReadTwoTone";
import KeyTwoToneIcon from "@mui/icons-material/KeyTwoTone";

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
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh" bgcolor="background.default">
      <Box sx={{ padding: 4, borderRadius: 2, maxWidth: 400, width: "100%", backgroundColor: "white" }}>
        <Typography variant="h5" fontWeight="bold" mb={2} textAlign="center">
          Welcome Back
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MarkEmailReadTwoToneIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
          
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <KeyTwoToneIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <Link href="/forgotpassword" variant="body2" display="block" textAlign="right" mb={2}>
            Forgot Password?
          </Link>

          <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 2.5 ,ml:4.7,width:"100%", maxWidth:"250px", borderRadius:12, '&:hover': {
            backgroundColor: 'primary.dark', // Adjust the color when hovered
            boxShadow: 3, // Add a nice shadow on hover
            transform: 'scale(0.90)', // Slightly enlarge the button for a more dynamic effect
            transition: 'all 0.3s ease', // Smooth transition
          },}}>
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
