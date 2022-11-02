import React, { useEffect } from "react";
import { Alert, Box, Slide } from "@mui/material";
import { closeAlert } from "../../Slices/modalSice";
import { useAppDispatch } from "../../Redux/hooks";
import "./AlertStyle.css";

type AlertProps = {
  isShowModalAlertMessage: boolean;
};

const Alerts = ({ isShowModalAlertMessage }: AlertProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isShowModalAlertMessage) {
      setTimeout(() => {
        isShowModalAlertMessage && dispatch(closeAlert(false));
      }, 3000);
    }
  }, [isShowModalAlertMessage]);

  return (
    <Box sx={{ width: `calc(100px + 16px)` }}>
      <Slide
        direction={"down"}
        in={isShowModalAlertMessage}
        mountOnEnter
        unmountOnExit
      >
        <Alert
          className={"AlertBox"}
          onClose={() => {
            dispatch(closeAlert(false));
          }}
          severity={"success"}
        >
          User successfully added
        </Alert>
      </Slide>
    </Box>
  );
};

export default Alerts;
