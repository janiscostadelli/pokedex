import { useQuery } from "@tanstack/react-query";
import React from "react";
import { APIPokemonsListDATA } from "../api/pokemons";
import { api } from "../hooks/api";

const HomePage: React.FC = () => {
  const { data, isLoading } = useQuery<APIPokemonsListDATA>(["pokemons"], () =>
    api.get("pokemon").then((res) => res.data)
  );
  console.log(data?.results[0].name);

  if (isLoading) return <>Loading...</>;

  return (
    <>
      {data?.results.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
    </>
  );
};

export default HomePage;
