import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Header from "./components/Header";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const MainStyle = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background-color: "#F4F4F3";
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MainStyle>
          <Header />
          <HomePage />
        </MainStyle>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
