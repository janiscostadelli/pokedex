import { GenericLite } from ".";

export type EvolvesTo = {
  species: GenericLite
  evolves_to?: EvolvesTo[]
  is_baby: boolean
}

export type Evolutions = {
  chain: EvolvesTo
  id?: number;
}