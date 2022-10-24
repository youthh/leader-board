import React from "react";
import "./App.css";
import "./reset.css";
import Header from "./Components/Header/Header";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import BasicModal from "./Components/Modal/Modal";
import { useSelector } from "react-redux";
import { modalSelector } from "./Slices/modalSice";
import Alert from "./Components/Alerts/Alert";

function App() {
  const { alertMessage, isModal } = useSelector(modalSelector);
  return (
    <div className="App">
      <div className="container">
        <div className="inner__app">
          <Header />
          <LeaderBoard />
          {isModal && <BasicModal />}
        </div>
      </div>
      {alertMessage.isShow && <Alert alertMessage={alertMessage} />}
    </div>
  );
}

export default App;
