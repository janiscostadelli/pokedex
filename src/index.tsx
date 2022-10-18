import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Header from "./components/Header";
import styled from "@emotion/styled";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HEADER_HEIGHT } from "./constants";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const MainStyle = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100vw;
  background-color: "#f4f4f4";
  padding: 0px 50px;
  padding-top: ${HEADER_HEIGHT};
`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssBaseline />
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Header />
        <MainStyle>
          <HomePage />
        </MainStyle>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
