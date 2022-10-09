import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Header from "./components/header";
import styled from "@emotion/styled";

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
    <ThemeProvider theme={theme}>
      <MainStyle>
        <Header />
        <App />
      </MainStyle>
    </ThemeProvider>
  </React.StrictMode>
);
