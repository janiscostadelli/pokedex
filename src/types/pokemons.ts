import { LiteType } from "./types";

type LitePokemon = {
  name: string;
  url: string;
}

export type APIPokemonsListDATA = {
  count: number;
  next: string;
  previous: string;
  results: LitePokemon[];
};

export type APIPokemonDATA = {
  name: string;
  id: number;
  weight: number;
  height: number;
  types: LiteType[];
  sprites: {
    back_default?: string,
    back_female?: string,
    back_shiny?: string,
    back_shiny_female?: string,
    front_default?: string,
    front_female?: string,
    front_shiny?: string,
    front_shiny_female?: string,
    other?: {
      dream_world: {
        front_default: string;
      };
    }
  }

}
