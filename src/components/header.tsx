import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import pokeballImage from "../../src/assets/icons/pokeball.png";
import styled from "@emotion/styled";

const PokeballIcon = styled.img`
  width: 80px;
  height: 80px;
`;

const StyledAppBar = styled(AppBar)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const Header: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static">
        <Toolbar>
          <PokeballIcon src={pokeballImage} alt="pokeball" />
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
};

export default Header;
