import { styled, Box, BoxProps, Button } from "@mui/material";
import React from "react";

const MainContainer = styled(Box)<BoxProps>(({ theme }) => ({
  display: "flex",
  minHeight: "50px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.default,
  justifyContent: "center",
  alignItems: "center",
}));

const Footer: React.FC = () => {
  return (
    <MainContainer>
      <Button
        href="https://github.com/janiscostadelli"
        target="_blank"
        rel="noreferrer"
        sx={{ color: "white", display: "flex", alignItems: "center" }}
      >
        Janis Costadelli ⭐
      </Button>
    </MainContainer>
  );
};

export default Footer;
