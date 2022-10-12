import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { APIPokemonDATA } from "../types/pokemons";
import TransitionUp from "./TransitionUp";
import CloseIcon from "@mui/icons-material/Close";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  open: boolean;
  onClose: () => void;
  url?: string;
};

const PokemonDialog: React.FC<Props> = ({ open, onClose, url }) => {
  const { data: pokemon } = useQuery<APIPokemonDATA>(
    ["pokemon", url],
    () => axios.get(`${url}`).then((res) => res.data),
    { enabled: !!url }
  );

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={onClose}
        TransitionComponent={TransitionUp}
      >
        <DialogTitle>
          <Typography>{pokemon?.name}</Typography>
        </DialogTitle>

        <DialogContent>
          <img
            src={pokemon?.sprites?.other?.dream_world?.front_default}
            alt="pokemon"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose} startIcon={<CloseIcon />}>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PokemonDialog;
