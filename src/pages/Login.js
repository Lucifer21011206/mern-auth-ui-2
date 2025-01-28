import { Grid, Card, CardContent } from "@mui/material";
import LeftImageSection from "../components/LeftImageSection";
import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", backgroundColor: "#1e1e2f", p: 2 ,background: "linear-gradient(135deg, #1a1a2e,rgb(59, 190, 147),rgb(26, 226, 233))"}}
    >
      <Card sx={{ maxWidth: 900,border:"3px solid rgb(106, 209, 216)", width: "100%", borderRadius: 5, overflow: "hidden" }}>
        <Grid container>
          {/* Left Image Section */}
          <Grid item xs={12} md={6}>
            <LeftImageSection />
          </Grid>

          {/* Right Login Form */}
          <Grid item xs={12} md={6}>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Login;