export type TypeName = 'grass'
  | 'normal'
  | 'bug'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'unknown'
  | 'shadow';

export type LiteType = {
  slot: number;
  type: {
    name: TypeName;
    url: string;
  };
}