import React from "react";
import "./App.css";
import "./reset.css";
import Header from "./Components/Header/Header";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import BasicModal from "./Components/Modal/Modal";
import { useSelector } from "react-redux";
import { closeAlert, modalSelector } from "./Slices/modalSice";
import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useAppDispatch } from "./Redux/hooks";

function App() {
  const { alertMessage, isModal } = useSelector(modalSelector);
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <div className="container">
        <div className="inner__app">
          <Header />
          <LeaderBoard />
          {isModal && <BasicModal />}
        </div>
      </div>
      {alertMessage.isShow && (
        <Stack sx={{ width: "50%" }}>
          <Alert
            onClose={() => {
              dispatch(closeAlert());
            }}
            severity={alertMessage.severity}
            style={{
              zIndex: "10000",
              position: "fixed",
              top: "20px",
              right: "20px",
              width: "280px",
            }}
          >
            <AlertTitle>Error</AlertTitle>
            {alertMessage.message}
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default App;
