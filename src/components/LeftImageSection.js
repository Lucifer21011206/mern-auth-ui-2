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
      }}
    />
  );
};

export default LeftImageSection;
