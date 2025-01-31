import { Grid, Card, CardContent } from "@mui/material";
import LeftImageSection from "../components/LeftImageSection";
import SignupForm from "../components/SignupForm";
import { Box } from "@mui/material";

const Signup = () => {
  return (
    <>
      {/* Logo positioned at the top left */}
      <Box
        sx={{
          position: "absolute",
          top: 30,
          left: 35,
          zIndex: 1000, // Ensure the logo is above other elements
        }}
      >
        <img
          src="../assets/Logo.png" // Path to your logo image
          alt="Logo"
          style={{
            width: "100px", // Adjust the size as needed
            height: "auto",
            borderRadius:"50%" // Maintain aspect ratio
          }}
        />
      </Box>

      {/* Main content */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#1e1e2f",
          p: 2,
          background: "linear-gradient(135deg,rgb(248, 99, 44), #FFB347, #FF7F50)"
        }}
      >
        <Card
          elevation={24}
          sx={{ maxWidth: 900, width: "100%", borderRadius: 5, overflow: "hidden" }}
        >
          <Grid container>
            {/* Left Image Section */}
            <Grid item xs={12} md={6}>
              <LeftImageSection />
            </Grid>

            {/* Right Signup Form */}
            <Grid item xs={12} md={6}>
              <CardContent>
                <SignupForm />
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </>
  );
};

export default Signup;
