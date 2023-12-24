import React from "react";
import { Todolists } from "../features/Todolists/Todolists";
import { Container } from "@mui/material";

export const App = () => {
  return <Container fixed sx={{ p: 4 }}>
    <Todolists />
  </Container>
};
