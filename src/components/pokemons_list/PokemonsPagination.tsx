import {
  IconButton,
  Stack,
  Typography,
  Grid,
  styled,
  IconButtonProps,
  StackProps,
} from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import React, { useState } from "react";

const LeftButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  position: "fixed",
  left: "20px",
  top: `calc(50vh - 25px)`,
  height: "50px",
  width: "50px",
  borderRadius: "10px",
  border: `3px solid ${theme.palette.primary.main}`,
  zIndex: "50",
}));

const RightButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  position: "fixed",
  right: "20px",
  top: `calc(50vh - 25px)`,
  height: "50px",
  width: "50px",
  borderRadius: "10px",
  border: `3px solid ${theme.palette.primary.main}`,
  zIndex: "50",
}));

const LabelContainer = styled(Stack)<StackProps>(({ theme }) => ({
  padding: "2px 10px",
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: "5px",
  marginBottom: "10px",
}));

type Props = {
  previous?: boolean;
  next?: boolean;
  goNext: () => void;
  goPrevious: () => void;
};

const PokemonsPagination: React.FC<Props> = ({
  previous,
  next,
  goNext,
  goPrevious,
}) => {
  const [page, setPage] = useState<number>(1);

  return (
    <Grid justifyContent="center" alignItems="center" display="flex">
      <LabelContainer direction="row" alignItems="center">
        <LeftButton
          color="primary"
          onClick={() => {
            setPage(page - 1);
            goPrevious();
          }}
          disabled={!previous}
        >
          <ArrowBackIosRoundedIcon />
        </LeftButton>

        <Typography
          variant="subtitle2"
          sx={{ fontSize: "20px", color: "#323232" }}
        >
          Page {page}
        </Typography>

        <RightButton
          color="primary"
          onClick={() => {
            setPage(page + 1);
            goNext();
          }}
          disabled={!next}
        >
          <ArrowForwardIosRoundedIcon />
        </RightButton>
      </LabelContainer>
    </Grid>
  );
};

export default PokemonsPagination;
