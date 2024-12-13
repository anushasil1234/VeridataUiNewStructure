import { Box, Typography } from "@mui/material";
import { heading1, pageHeadingContainer } from "app";
import React from "react";
import ContentWrapper from "./content-wrapper";
import DarkTooltip from "../tooltip/dark-tooltip";

const PageLayout = ({ children, pageName,tooltipInfo }) => {
  return (
    <ContentWrapper>
      <Box sx={pageHeadingContainer}>
        <Typography variant="h5" sx={heading1} component="h1">
          {tooltipInfo ? <DarkTooltip placement="bottom" title={tooltipInfo} arrow>
            <span>{pageName}</span>
          </DarkTooltip> : <span>{pageName}</span>}
        </Typography>
      </Box>

      <Box>{children}</Box>
    </ContentWrapper>
  );
};

export { PageLayout };
