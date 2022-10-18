import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { API_URL } from "../constants";
import { APIPokemonsListDATA } from "../types/pokemons";
import PokemonDialog from "./PokemonDialog";
import styled from "@emotion/styled";
import pokeballTiny from "../assets/icons/pokeballTiny.png";

type Props = {};

const Option = styled(Typography)`
  display: flex;
  align-items: center;
  font-size: 22px;
  letter-spacing: 1px;
  padding: 10px;
  color: #515151;
  background-color: #f7f7f7;
  cursor: pointer;
  font-weight: 400;
  &:hover {
    font-weight: 600;
    background-color: #f3f3f3;
    color: #dd2d51; //TO DO: mudar a cor para a cor do tema do material
  }

  img {
    margin-right: 8px;
  }
`;

const PokemonSearch: React.FC<Props> = () => {
  const { data: pokemons } = useQuery<APIPokemonsListDATA>(
    ["pokemons", 0, 100000],
    () =>
      axios
        .get(`${API_URL}/pokemon?offset=${0}&limit=${100000}`)
        .then((res) => res.data)
  );

  const [value, setValue] = useState<
    { value: string; label: string } | undefined
  >();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");

  const options = useMemo(() => {
    return (
      pokemons?.results?.map((pokemon) => {
        return {
          value: pokemon.url,
          label: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        };
      }) || [{ label: "Carregando...", value: "" }]
    );
  }, [pokemons]);

  return (
    <>
      {openDialog && <PokemonDialog
        url={value?.label ? `${API_URL}/pokemon/${value?.label.toLowerCase()}` : undefined}
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setValue(undefined);
        }}
      />}

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
          p: "6px",
        }}
      >
        <Autocomplete
          size="small"
          options={options}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "0",
              padding: "0",
            },
            "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
              border: "1px solid white",
            },
            width: "300px",
          }}
          getOptionDisabled={(option) => option.label === "Carregando..."}
          key={"pokemon-search-bar"}
          disableClearable
          inputValue={inputValue}
          onInputChange={(_e, newValue) => setInputValue(newValue)}
          renderOption={(_props, option: { label: string; value: string }) => {
            return (
              <Option
                key={`pokemon-option-${option?.label}`}
                onClick={() => {
                  setValue(option);
                  setOpenDialog(true);
                  setInputValue("");
                }}
              >
                <img src={pokeballTiny} alt="pokeball" />
                {option?.label}
              </Option>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search a pokemon"
              placeholder="Pikachu"
            />
          )}
        ></Autocomplete>
      </Box>
    </>
  );
};

export default PokemonSearch;
