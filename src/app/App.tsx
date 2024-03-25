import React, { FC, useEffect } from "react";
import { Todolists } from "../features/Todolists";
import { ErrorSnackBar } from "../components/ErrorSnackBar";
import { Container, LinearProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../state/store";
import { RequestStatusType, initializeApp } from "../state/app/app-reducer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../features/Login";
import { CircleLoader } from "../components/CircleLoader";

type PropsType = {
  demo?: boolean;
};

export const App: FC<PropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch();

  const statusApp = useAppSelector<RequestStatusType>(
    state => state.app.status
  );

  const isInitialized = useAppSelector<boolean>(
    state => state.app.isInitialized
  );

  useEffect(() => {
    dispatch(initializeApp())
  }, []);

  if (!isInitialized) {
    return (
     <CircleLoader />
    )
  }

  return (
    <BrowserRouter>
      {statusApp === "loading" && (
        <LinearProgress
          sx={{
            position: "fixed",
            width: "100%",
          }}
        />
      )}
      <Container fixed sx={{ p: 4 }}>
        <Routes>
          <Route path="/" element={<Todolists demo={demo} />} />
          <Route path="/login" element={<Login />} />
          <Route path={'/404'} element={<h2 style={{ alignItems: 'center' }}>PAGE NOT FOUND</h2>} />
          <Route path={'*'} element={<Navigate to={'/404'} />} />
        </Routes>
      </Container>
      <ErrorSnackBar />
    </BrowserRouter>
  );
};
