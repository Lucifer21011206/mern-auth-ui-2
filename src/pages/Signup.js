import { Grid, Card, CardContent } from "@mui/material";
import LeftImageSection from "../components/LeftImageSection";
import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      
      sx={{ minHeight: "100vh", backgroundColor: "#1e1e2f", p: 2, background: "linear-gradient(135deg, #00ff99, #ff0080, #00eaff)"
      }}
    >
      <Card elevation={24} sx={{ maxWidth: 900, width: "100%", borderRadius: 5, overflow: "hidden" }}>
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
  );
};

export default Signup;
