import styled from "@emotion/styled";
import { Card, Skeleton, Stack, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { APIPokemonDATA } from "../../types/pokemons";
import { padNumber } from "../../utils";
import { getPokemonTypeColor } from "../../utils/pokemon_type_color";
import PokemonChipType from "../PokemonChipType";
import PokemonDialog from "../PokemonDialog";

const MyCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 250px;
  height: 320px;
  z-index: 1;
  background: transparent;
  img {
    height: 200px;
    width: 200px;
    transition: 100ms;
  }
  cursor: pointer;
  &:hover {
    img {
      height: 210px;
      width: 210px;
      transform: rotate(15deg);
    }
  }

  &:hover {
    .background-card {
      opacity: 0.8;
      outline: 2px solid black;
    }
  }
`;

const BackgroundCard = styled(Card)`
  position: absolute;
  height: 70%;
  width: 100%;
  bottom: 0;
  background-color: ${(props) => props.color};
  opacity: 0.5;
  z-index: -1;
  transition: 100ms;
`;

type Props = {
  url?: string;
  loading?: boolean;
};

const PokemonCard: React.FC<Props> = ({ url, loading = false }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { data: pokemon, isLoading } = useQuery<APIPokemonDATA>(
    ["pokemon", url],
    () => axios.get(`${url}`).then((res) => res.data),
    { enabled: !!url }
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

  if (isLoading || loading || !url || !pokemon) {
    return (
      <MyCard>
        <Skeleton
          variant="circular"
          width="200px"
          height="200px"
          animation="wave"
        />
        <Stack
          direction="column"
          width="100%"
          alignItems="flex-start"
          mt={2}
          ml={2}
          alignSelf="flex-start"
        >
          <Skeleton variant="text" sx={{ fontSize: "24px" }} width="50%" />
          <Skeleton variant="text" sx={{ fontSize: "24px" }} width="30%" />
        </Stack>
        <BackgroundCard>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="pulse"
          />
        </BackgroundCard>
      </MyCard>
    );
  }

  return (
    <>
      <PokemonDialog
        url={url}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
      <Tooltip
        title="Clique para saber mais"
        onClick={() => setOpenDialog(true)}
      >
        <MyCard>
          <img
            src={
              pokemon?.sprites?.other?.dream_world?.front_default ||
              pokemon?.sprites?.other?.["official-artwork"]?.front_default
            }
            alt="pokemon"
          />
          <Stack
            direction="column"
            alignItems="flex-start"
            mt={2}
            ml={2}
            alignSelf="flex-start"
          >
            <Typography sx={{ fontSize: "14px", color: "#515151" }}>
              #{id}
            </Typography>
            <Typography sx={{ fontSize: "24px", color: "#515151" }}>
              {pokemon?.name.toUpperCase()}
            </Typography>
            <Stack direction="row" gap={2}>
              {pokemon?.types?.map((type) => (
                <PokemonChipType
                  key={`pokemon-type-${type.type.name}-${new Date()}`}
                  typeName={type.type.name}
                ></PokemonChipType>
              ))}
            </Stack>
          </Stack>
          <BackgroundCard
            className="background-card"
            elevation={0}
            color={getPokemonTypeColor(pokemon?.types?.[0].type?.name)}
          />
        </MyCard>
      </Tooltip>
    </>
  );
};

export default PokemonCard;
