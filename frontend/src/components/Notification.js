/* eslint-disable react/prop-types */
import { Alert, Snackbar } from "@mui/material";

const Notification = ({
  autoHideDuration,
  open,
  message,
  onClose,
  severity,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      data-testid="snackbar"
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
