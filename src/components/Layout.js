import { Grid, Paper } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
    
  
    <Grid container style={{ height: "100vh", borderRadius: "100px" }}>
      {/* Left Image Section */}
      <Grid item xs={12} md={6} sx={{ background: "url('/assets/pexels-eberhardgross-8051674.jpg')", backgroundSize: "cover" }} />
      
      {/* Right Form Section */}
      <Grid item xs={12} md={6} component={Paper} elevation={15} square sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </Grid>
    </Grid>
    </>
  );
};

export default Layout;
