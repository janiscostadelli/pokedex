import styled from "@emotion/styled";
import React from "react";
import { TypeName } from "../types/types";
import { getPokemonTypeColor } from "../utils/pokemon_type_color";

type Props = {
  typeName: TypeName;
};

const ChipType = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.color};
  padding: 2px 20px;
  font-size: 14px;
  font-weight: 700;
  color: #262626;
  text-transform: capitalize;
`;

const PokemonChipType: React.FC<Props> = ({ typeName }) => {
  return (
    <>
      <ChipType color={getPokemonTypeColor(typeName)}>{typeName}</ChipType>
    </>
  );
};

export default PokemonChipType;
