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