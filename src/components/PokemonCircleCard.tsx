import {
  Box,
  BoxProps,
  Skeleton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import { APIPokemonDATA } from "../types/pokemons";
import { Specie } from "../types/species";
import { API_URL } from "../constants";
import { getPokemonTypeColor } from "../utils/pokemon_type_color";
import PokemonChipType from "./PokemonChipType";
import { padNumber } from "../utils";

type Props = {
  url: string;
  setSelectedPokemonUrl: Dispatch<SetStateAction<string | undefined>>;
  selectedPokemonUrl: string | undefined;
};

const ImageContainer = styled(Box)<BoxProps & { selected: boolean }>(
  ({ theme, color, selected }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    height: "200px",
    position: "relative",
    alignSelf: "center",
    cursor: "pointer",

    ".circlePokemonCard": {
      transition: "300ms",
      opacity: selected ? 1 : 0.4,
      width: selected ? "105%" : "100%",
      height: selected ? "105%" : "100%",
    },

    "&:hover": {
      ".circlePokemonCard": {
        opacity: 1,
        width: "105%",
        height: "105%",
      },
    },
  })
);

const PokemonCircleCard: React.FC<Props> = ({
  url,
  selectedPokemonUrl,
  setSelectedPokemonUrl,
}) => {
  const { data: pokemonSpecies } = useQuery<Specie>(
    ["pokemon", "species", url],
    () => axios.get(`${url}`).then((res) => res.data),
    { enabled: !!url }
  );

  const { data: pokemon, isLoading } = useQuery<APIPokemonDATA>(
    ["pokemon", pokemonSpecies?.name],
    () =>
      axios
        .get(`${API_URL}/pokemon/${pokemonSpecies?.name}`)
        .then((res) => res.data),
    { enabled: !!pokemonSpecies?.name }
  );

  const id = useMemo(() => {
    if (!pokemon?.id) {
      return "";
    }
    if (pokemon?.id < 10) {
      return padNumber(pokemon?.id, 3);
    } else if (pokemon?.id < 100) {
      return padNumber(pokemon?.id, 3);
    } else {
      return pokemon?.id.toString();
    }
  }, [pokemon]);

  if (isLoading || !pokemon) {
    return (
      <Skeleton
        variant="circular"
        width="100px"
        height="100px"
        animation="wave"
      />
    );
  }

  return (
    <Stack flexDirection="column" alignItems="flex-start" gap={1}>
      <ImageContainer
        onClick={()=>setSelectedPokemonUrl(`${API_URL}/pokemon/${pokemon?.name}`)}
        selected={selectedPokemonUrl === `${API_URL}/pokemon/${pokemon?.name}`}
      >
        <img
          src={
            pokemon?.sprites?.other?.dream_world?.front_default ||
            pokemon?.sprites?.other?.["official-artwork"]?.front_default
          }
          style={{ width: "100%", height: "100%", zIndex: 3 }}
          alt="pokemon"
        />

        <Box
          sx={{
            position: "absolute",
            backgroundColor: getPokemonTypeColor(pokemon?.types[0]?.type?.name),
            zIndex: 2,
            borderRadius: "50%",
          }}
          className="circlePokemonCard"
        />
      </ImageContainer>

      <Stack flexDirection="row" alignItems="center ">
        <Typography fontWeight="600">
          {pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)}
        </Typography>

        <Typography sx={{ fontWeight: "400", color: "#515151" }}>
          &nbsp;#{id}
        </Typography>
      </Stack>

      <Stack direction="row" gap={2}>
        {pokemon?.types?.map((type) => (
          <PokemonChipType
            key={`pokemon-type-${type.type.name}-${new Date()}`}
            typeName={type.type.name}
          ></PokemonChipType>
        ))}
      </Stack>
    </Stack>
  );
};

export default PokemonCircleCard;
