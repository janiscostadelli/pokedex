import React, { Dispatch, SetStateAction } from "react";
import { EvolvesTo } from "../types/evolutions";
import PokemonCircleCard from "./PokemonCircleCard";

type Props = {
  evolvesTo?: EvolvesTo;
  setSelectedPokemonUrl: Dispatch<SetStateAction<string | undefined>>;
  selectedPokemonUrl: string | undefined;
};

const PokemonEvolutions: React.FC<Props> = ({
  evolvesTo,
  selectedPokemonUrl,
  setSelectedPokemonUrl,
}) => {
  if (!evolvesTo) {
    return null;
  }

  return (
    <>
      <PokemonCircleCard
        url={evolvesTo?.species.url}
        setSelectedPokemonUrl={setSelectedPokemonUrl}
        selectedPokemonUrl={selectedPokemonUrl}
      />

      <PokemonEvolutions
        setSelectedPokemonUrl={setSelectedPokemonUrl}
        selectedPokemonUrl={selectedPokemonUrl}
        evolvesTo={evolvesTo?.evolves_to?.[0]}
      />
    </>
  );
};

export default PokemonEvolutions;
