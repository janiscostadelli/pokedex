import { Grid } from "@mui/material";
import React, { useState } from "react";
import PokemonSearch from "../components/PokemonSearch";
import PokemonsList from "../components/pokemons_list/PokemonsList";
import PokemonsPagination from "../components/pokemons_list/PokemonsPagination";

const HomePage: React.FC = () => {
  const pageLimit: number = 20;
  const [pageOffset, setPageOffset] = useState<number>(0);
  const [pagination, setPagination] = useState<{
    previous: boolean;
    next: boolean;
  }>({
    previous: false,
    next: true,
  });

  return (
    <>
      <Grid display="flex" width="100%" justifyContent="center" mt={4}>
        <PokemonSearch></PokemonSearch>
      </Grid>
      <Grid display="flex" flex={1}>
        <PokemonsList
          setPagination={setPagination}
          pageLimit={pageLimit}
          pageOffset={pageOffset}
        />
      </Grid>

      <PokemonsPagination
        previous={pagination.previous}
        next={pagination.next}
        goNext={() => setPageOffset(pageOffset + pageLimit)}
        goPrevious={() => setPageOffset(pageOffset - pageLimit)}
      />
    </>
  );
};

export default HomePage;
