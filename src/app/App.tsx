import React, { FC } from "react";
import { Todolists } from "../features/Todolists/Todolists";
import { ErrorSnackBar } from "../components/ErrorSnackBar";
import { Container, LinearProgress } from "@mui/material";
import { useAppSelector } from "../state/store";
import { RequestStatusType } from "../state/app/app-reducer";

type PropsType = {
  demo?: boolean;
};

export const App: FC<PropsType> = ({ demo = false }) => {
  const statusApp = useAppSelector<RequestStatusType>(
    state => state.app.status
  );

  return (
    <>
      {statusApp === "loading" && (
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
