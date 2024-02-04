import React, { FC } from "react";
import { Todolists } from "../features/Todolists/Todolists";
import { ErrorSnackBar } from "../components/ErrorSnackBar";
import { Container, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { AppRootState } from "../state/store";
import { RequestStatusType } from "../state/app/app-reducer";

type PropsType = {
  demo?: boolean;
}

export const App:FC<PropsType> = ({demo = false}) => {
  const status = useSelector<AppRootState, RequestStatusType>(
    state => state.app.status
  );

  return (
    <>
      {status === "loading" && (
        <LinearProgress
          sx={{
            position: "fixed",
            width: "100%",
          }}
        />
      )}
      <Container fixed sx={{ p: 4 }}>
        <Todolists demo={demo} />
      </Container>
      <ErrorSnackBar />
    </>
  );
};
