import React from "react";
import { Alert, AlertColor, Stack } from "@mui/material";
import { closeAlert } from "../../Slices/modalSice";
import { useAppDispatch } from "../../Redux/hooks";
import "./AlertStyle.css";
type AlertProps = {
  alertMessage: { severity: AlertColor; message: string; isShow: boolean };
};

const Alerts = ({ alertMessage }: AlertProps) => {
  const dispatch = useAppDispatch();
  return (
    <Stack className="AlertBox" sx={{ width: "20%" }} spacing={2}>
      <Alert
        onClose={() => {
          dispatch(closeAlert());
        }}
        severity={alertMessage.severity}
      >
        {alertMessage.message}
      </Alert>
    </Stack>
  );
};

export default Alerts;
