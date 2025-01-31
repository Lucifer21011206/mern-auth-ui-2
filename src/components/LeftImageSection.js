import { Box } from "@mui/material";

const LeftImageSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundImage: "url('/assets/pexels-eberhardgross-8051674.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Logo positioned at the top-left corner */}
      <img
        // src="/assets/Logo.png" // Replace with the correct path to your uploaded logo
        // alt="Logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "70px", // Adjust size as needed
          height: "auto",
          borderRadius:"70%",
          opacity:1,
        }}
      />
    </Box>
  );
};

export default LeftImageSection;
