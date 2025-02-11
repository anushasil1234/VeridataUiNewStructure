import { Box, Button, TextField, Typography } from "@mui/material";
import { welcomeMsg } from "shared/constants/constants";

const AppointeeWelcomeDetails = ({userName}) => {
  return (
    <>
      <Box
        sx={{
          padding: { xs: "16px", sm: "24px" }, // Responsive padding
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          maxWidth: "600px", // Limit width for better readability
          margin: "0 auto", // Center the box
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.25rem", sm: "1.5rem" }, // Responsive font size
            fontWeight: 600,
            color: "#2d3748", // Darker color for better contrast
            marginBottom: "8px", // Spacing below the heading
          }}
        >
          Hi {userName?.split(" ")[0]} !
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "0.875rem", sm: "0.9rem" }, // Responsive font size
            color: "#6e6d7a",
            textAlign: "left",
            whiteSpace: "pre-line", // Preserve line breaks in the welcome message
            lineHeight: "1.6", // Improve readability
          }}
        >
          {welcomeMsg}
        </Typography>
      </Box>
    </>
  );
};
export default AppointeeWelcomeDetails;
