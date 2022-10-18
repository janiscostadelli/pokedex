import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import pokeballImage from "../../src/assets/icons/pokeball.png";
import styled from "@emotion/styled";
import PokemonSearch from "../components/PokemonSearch";
import { Slide, useScrollTrigger } from "@mui/material";
import { HEADER_HEIGHT } from "../constants";

const PokeballIcon = styled.img`
  width: 80px;
  height: 80px;
`;

const StyledAppBar = styled(AppBar)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${HEADER_HEIGHT};
`;

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header: React.FC = () => {
  return (
    <HideOnScroll>
      <StyledAppBar>
        <Toolbar sx={{ display: "flex", flexDirection: "column" }}>
          <PokeballIcon
            src={pokeballImage}
            alt="pokeball"
            style={{ width: "50px", height: "50px", marginBottom: "5px" }}
          />
          <PokemonSearch />
        </Toolbar>
      </StyledAppBar>
    </HideOnScroll>
  );
};

export default Header;
