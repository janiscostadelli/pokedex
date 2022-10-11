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
import PokemonCard from "./pokemons_list/PokemonCard";

type Props = {
  open: boolean;
  onClose: () => void;
  pokemon: APIPokemonDATA;
};

const PokemonDialog: React.FC<Props> = ({ open, onClose, pokemon }) => {
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
          {/* <PokemonCard ></PokemonCard> */}
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
