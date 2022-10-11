import { IconButton, Stack, Tooltip, Typography, Paper, Grid } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import React, { useState } from "react";
import styled from "@emotion/styled";

const MyPaper = styled(Paper)`
  padding: '5px';
  border-radius: 25px;
  width: fit-content;
  margin: 10px;
  background-color: transparent;
`

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
    <Grid justifyContent='center' alignItems='center' display='flex'>
      <MyPaper variant="outlined">
        <Stack direction="row" spacing={10} alignItems="center">
          <Tooltip title="Página anterior">
            <IconButton
              color="primary"
              onClick={() => {
                setPage(page - 1);
                goPrevious();
              }}
              disabled={!previous}
            >
              <ArrowBackIosRoundedIcon />
            </IconButton>
          </Tooltip>

          <Typography variant="subtitle2" sx={{ fontSize: "20px" }}>
            {page}
          </Typography>

          <Tooltip title="Próxima página">
            <IconButton
              color="primary"
              onClick={() => {
                setPage(page + 1);
                goNext();
              }}
              disabled={!next}
            >
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </MyPaper>
    </Grid>
  );
};

export default PokemonsPagination;
