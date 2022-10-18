import React from "react";
import "./header.css";
import headerPeople from "../../images/headerPeople.svg";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useAppSelector } from "../../Redux/hooks";
import { leaderSelector } from "../../Slices/leaderSlice";
import LeaderItem from "./Leaders";

const Header = () => {
  const { leaders, isLoading } = useAppSelector(leaderSelector);

  return (
    <div className="header__box">
      <div>
        <h1 className="header_title">All-time highest scores</h1>
        <p className="header__text">
          You can be among the leaders already today
        </p>
        <div
          className="header_box-leaders"
          style={
            isLoading
              ? { justifyContent: "center" }
              : { justifyContent: "flex-start" }
          }
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            leaders.map((i, index) => {
              return (
                <LeaderItem
                  img={i.img}
                  index={index}
                  key={index}
                  score={i.score}
                  name={i.name}
                />
              );
            })
          )}
        </div>
      </div>
      <div className="header_box--img">
        <img className="header__img" src={headerPeople} alt="people" />
      </div>
    </div>
  );
};

export default Header;
