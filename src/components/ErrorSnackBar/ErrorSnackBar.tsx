import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useSelector } from "react-redux";
import { AppRootState } from "../../state/store";
import { useDispatch } from "react-redux";
import { setErrorAC } from "../../state/app/app-reducer";

export const ErrorSnackBar = () => {
  const error = useSelector<AppRootState, string | null>(
    state => state.app.error
  );

  const dispatch = useDispatch();

  const isOpenError = error !== null;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    
    dispatch(setErrorAC(null))
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
