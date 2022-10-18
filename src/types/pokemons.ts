import { GenericLite } from ".";
import { LiteStat } from "./stats";
import { LiteType } from "./types";


export type APIPokemonsListDATA = {
  count: number;
  next: string;
  previous: string;
  results: GenericLite[];
};

export type APIPokemonDATA = {
  name: string;
  id: number;
  weight: number;
  height: number;
  types: LiteType[];
  stats: LiteStat[];
  species: GenericLite
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
      home: {
        front_default: string;
      },
      'official-artwork': {
        front_default: string;
      }
    }
  }
}