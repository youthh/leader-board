import React, { useEffect } from "react";
import { Alert, AlertColor, Box, Slide } from "@mui/material";
import { closeAlert } from "../../Slices/modalSice";
import { useAppDispatch } from "../../Redux/hooks";
import "./AlertStyle.css";

type AlertProps = {
  alertMessage: { severity: AlertColor; message: string; isShow: boolean };
};

const Alerts = ({ alertMessage }: AlertProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (alertMessage.isShow) {
      setTimeout(() => {
        alertMessage.isShow && dispatch(closeAlert(false));
      }, 3000);
    }
  });

  return (
    <Box sx={{ width: `calc(100px + 16px)` }}>
      <Slide
        direction={"down"}
        in={alertMessage.isShow}
        mountOnEnter
        unmountOnExit
      >
        <Alert
          className={"AlertBox"}
          onClose={() => {
            dispatch(closeAlert(false));
          }}
          severity={alertMessage.severity}
        >
          {alertMessage.message}
        </Alert>
      </Slide>
    </Box>
  );
};

export default Alerts;
