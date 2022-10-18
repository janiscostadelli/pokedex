import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
  Skeleton,
  styled,
  StackProps,
} from "@mui/material";
import React, { useState } from "react";
import { APIPokemonDATA } from "../types/pokemons";
import TransitionUp from "./TransitionUp";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PokemonChipType from "./PokemonChipType";
import { Evolutions } from "../types/evolutions";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import { Specie } from "../types/species";
import PokemonEvolutions from "./PokemonEvolutions";
import { getPokemonTypeColor } from "../utils/pokemon_type_color";
import pokeballTiny from "../assets/icons/pokeballTiny.png";

type Props = {
  open: boolean;
  onClose: () => void;
  url?: string;
};

const EvolutionsDetails = styled(Stack)<StackProps & { borderColor: string }>(
  ({ theme, borderColor }) => ({
    border: `2px solid ${borderColor}`,
    borderRadius: "10px",
  })
);

const PokemonDialog: React.FC<Props> = ({ open, onClose, url }) => {
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState(url);

  console.log(url);

  const { data: pokemon, isLoading } = useQuery<APIPokemonDATA>(
    ["pokemon", selectedPokemonUrl],
    () => axios.get(`${selectedPokemonUrl}`).then((res) => res.data),
    { enabled: !!selectedPokemonUrl }
  );

  const { data: pokemonSpecies } = useQuery<Specie>(
    ["pokemon", "species", pokemon?.species?.url],
    () => axios.get(`${pokemon?.species?.url}`).then((res) => res.data),
    { enabled: !!pokemon?.species?.url }
  );

  const { data: pokemonEvolutionChain } = useQuery<Evolutions>(
    ["pokemon", "evolutionChain", pokemonSpecies?.evolution_chain?.url],
    () =>
      axios
        .get(`${pokemonSpecies?.evolution_chain?.url}`)
        .then((res) => res.data),
    { enabled: !!pokemonSpecies?.evolution_chain?.url }
  );

  if (isLoading || !url || !pokemon) {
    return (
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={onClose}
        TransitionComponent={TransitionUp}
      >
        <DialogContent sx={{ height: "892px" }}>
          <Stack spacing={4}>
            <Stack flexDirection="row" gap={2} height={400}>
              <Box sx={{ flex: 4, height: "100%", width: "100%" }}>
                <Skeleton variant="rectangular" height="100%" width="100%" />
              </Box>
              <Box sx={{ flex: 6, height: "100%", width: "100%" }}>
                <Skeleton variant="rectangular" height="100%" width="100%" />
              </Box>
            </Stack>

            <Stack flexDirection="row" justifyContent="center" gap={4}>
              <Skeleton variant="circular" width="200px" height="200px" />
              <Skeleton variant="circular" width="200px" height="200px" />
              <Skeleton variant="circular" width="200px" height="200px" />
            </Stack>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} startIcon={<CloseIcon />}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={onClose}
        TransitionComponent={TransitionUp}
      >
        <DialogContent>
          <Stack flexDirection="column" spacing={4}>
            <Stack flexDirection="row" spacing={2}>
              <Stack
                flexDirection="column"
                sx={{ padding: "20px", flex: "6", gap: "10px" }}
              >
                <Typography
                  sx={{
                    fontFamily: "Oswald",
                    fontSize: "32px",
                    fontWeight: 300,
                  }}
                >
                  {pokemon?.name.toUpperCase()}
                  <img
                    src={pokeballTiny}
                    style={{ marginLeft: "4px" }}
                    alt="pokeball"
                  />
                </Typography>

                <Stack direction="row" gap={2}>
                  {pokemon?.types?.map((type) => (
                    <PokemonChipType
                      key={`pokemon-type-${
                        type.type.name
                      }-${url}-${new Date()}`}
                      typeName={type.type.name}
                    ></PokemonChipType>
                  ))}
                </Stack>

                <Box mt={2} />

                <Stack sx={{ flex: 1 }} spacing={2}>
                  {pokemon?.stats.map((stat) => (
                    <LinearProgressWithLabel
                      valueColor={getPokemonTypeColor(
                        pokemon?.types[0]?.type?.name
                      )}
                      key={`pokemon-stat-${stat.base_stat}-${stat.stat.name}-${pokemon?.name}`}
                      variant="determinate"
                      value={stat.base_stat}
                      prefix={stat.stat.name}
                    />
                  ))}
                </Stack>
              </Stack>

              <Box
                sx={{
                  padding: "20px",
                  flex: "4",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <img
                  src={
                    pokemon?.sprites?.other?.dream_world?.front_default ||
                    pokemon?.sprites?.other?.["official-artwork"]?.front_default
                  }
                  alt="pokemon"
                  style={{ width: "250px", height: "250px" }}
                />
              </Box>
            </Stack>

            <EvolutionsDetails
              borderColor={getPokemonTypeColor(pokemon?.types[0]?.type?.name)}
              gap={4}
              padding={2}
            >
              <Typography variant="h5" fontFamily="Oswald">
                Evolutions
              </Typography>

              <Stack flexDirection="row" gap={2} justifyContent="center">
                <PokemonEvolutions
                  setSelectedPokemonUrl={setSelectedPokemonUrl}
                  selectedPokemonUrl={selectedPokemonUrl}
                  evolvesTo={pokemonEvolutionChain?.chain}
                />
              </Stack>
            </EvolutionsDetails>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} startIcon={<CloseIcon />}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PokemonDialog;
