import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { setErrorAC } from "../../state/app/app-reducer";

export const ErrorSnackBar = () => {
  const error = useAppSelector<string | null>(state => state.app.error);

  const dispatch = useAppDispatch();

  const isOpenError = error !== null;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(setErrorAC(null));
  };

  return (
    <Snackbar
      open={isOpenError}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        variant="filled"
        sx={{ width: "100%" }}
      >
        {error}
      </Alert>
    </Snackbar>
  );
};
