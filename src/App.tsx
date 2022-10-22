import React from "react";
import "./App.css";
import "./reset.css";
import Header from "./Components/Header/Header";
import LeaderBoard from "./Components/LeaderBoard/LeaderBoard";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="inner__app">
          <Header />
          <LeaderBoard />
        </div>
      </div>
    </div>
  );
}

export default App;
