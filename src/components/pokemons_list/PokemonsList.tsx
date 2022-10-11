import { Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { APIPokemonsListDATA } from "../../types/pokemons";
import { API_URL } from "../../constants";
import PokemonCard from "./PokemonCard";

type Props = {
  pageOffset?: number;
  pageLimit?: number;
  setPagination?: Dispatch<
    SetStateAction<{ previous: boolean; next: boolean }>
  >;
};

const PokemonsList: React.FC<Props> = ({
  pageOffset,
  pageLimit = 10,
  setPagination,
}) => {
  const { data, isLoading } = useQuery<APIPokemonsListDATA>(
    ["pokemons", pageOffset, pageLimit],
    () =>
      axios
        .get(`${API_URL}/pokemon?offset=${pageOffset}&limit=${pageLimit}`)
        .then((res) => res.data)
  );

  useEffect(() => {
    setPagination?.({ previous: !!data?.previous, next: !!data?.next });
  }, [data, setPagination]);

  if (isLoading) {
    return (
      <Stack direction="row" gap={2} flexWrap="wrap" justifyContent='center' padding={2}>
        {Array.from({length: pageLimit}, (_, i) => i + 1).map((n)=><PokemonCard key={`pokemon-card-skeleton-${n}`} loading/>)}
      </Stack>
    );
  }

  return (
    <Stack direction="row" gap={2} flexWrap="wrap" justifyContent='center' padding={2}>
      {data?.results?.map((pokemon) => (
        <PokemonCard key={pokemon.name} url={pokemon.url} />
      ))}
    </Stack>
  );
};

export default PokemonsList;
