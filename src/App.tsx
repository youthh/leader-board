import React from "react";
import "./App.css";
import "./Components/Alerts/AlertStyle.css";
import "./reset.css";
import Header from "./Components/Header/Header";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";
import BasicModal from "./Components/Modal/Modal";
import { useSelector } from "react-redux";
import { modalSelector } from "./Slices/modalSice";
import Alert from "./Components/Alerts/Alert";
import ModalAddUser from "./Components/Modal/ModalAddUser";
import ModalEditScore from "./Components/Modal/ModalEditScore";

function App() {
  const { isShowModal } = useSelector(modalSelector);
  return (
    <div className="App">
      <div className="container">
        <div className="inner__app">
          <Header />
          <LeaderBoard />
          {isShowModal && (
            <BasicModal>
              <ModalAddUser />
              <ModalEditScore />
            </BasicModal>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
