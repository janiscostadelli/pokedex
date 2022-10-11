import { TypeName } from "../types/types";

export const getPokemonTypeColor = (typeName?: TypeName): string => {
  switch (typeName) {
    case "grass":
      return "#9BCC50";
    case "normal":
      return "#A4ACAF";
    case "bug":
      return "#729F40";
    case "fighting":
      return "#D5672B";
    case "flying":
      // return "#3DC7EF"", ""#BEB9B8";
      return "#359bb7";
    case "poison":
      return "#BA7FCA";
    case "ground":
      // return "#F7DF3F"", ""#AB9742";
      return "#baa835";
    case "rock":
      return "#A38C21";
    case "ghost":
      return "#7B62A3";
    case "steel":
      return "#9EB7B8";
    case "fire":
      return "#FC7D35";
    case "water":
      return "#4592C4";
    case "electric":
      return "#EED535";
    case "psychic":
      return "#F366B9";
    case "ice":
      return "#52C5E8";
    case "dragon":
      // return "#53A4CF"", ""#F16E57";
      return "#F16E57"
    case "dark":
      return "#707070";
    case "fairy":
      return "#F8B8E9";
    case "unknown":
      return 'transparent';
    case "shadow":
      return "#A4ACAF";
    default:
      return 'transparent';
  }
}

export const getBackgroundColorByType = (typeName?: TypeName): string => {
  switch (typeName) {
    case "grass":
      return "#CEF199";
    case "normal":
      return "#c1d4db";
    case "bug":
      return "#9acf5f";
    case "fighting":
      return "#e88f5f";
    case "flying":
      // return "#3DC7EF"", ""#BEB9B8";
      return "#5bb2c9";
    case "poison":
      return "#d1a2de";
    case "ground":
      // return "#F7DF3F"", ""#AB9742";
      return "#cfbf5f";
    case "rock":
      return "#d4bb46";
    case "ghost":
      return "#ac92d6";
    case "steel":
      return "#c3e2e3";
    case "fire":
      return "#ffa775";
    case "water":
      return "#81c9f7";
    case "electric":
      return "#f7e98d";
    case "psychic":
      return "#f79cd2";
    case "ice":
      return "#ade6f7";
    case "dragon":
      // return "#53A4CF"", ""#F16E57";
      return "#f58f7d"
    case "dark":
      return "#bfbfbf";
    case "fairy":
      return "#fce1f6";
    case "unknown":
      return 'transparent';
    case "shadow":
      return "#dae8ed";
    default:
      return 'transparent';
  }
}
