import React from "react";
import "./header.css";
import headerPeople from "../../images/headerPeople.svg";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { useAppSelector } from "../../Redux/hooks";
import { leaderSelector } from "../../Slices/leaderSlice";
import LeaderItem from "./Leaders";
import { motion } from "framer-motion";

const Header = () => {
  const { leadersAllTime, page, isAnotherDayLoading } =
    useAppSelector(leaderSelector);

  return (
    <div className="header__box">
      <div>
        <h1 className="header_title">All-time highest scores</h1>
        <p className="header__text">
          You can be among the leaders already today
        </p>
        <div
          className="left_header"
          style={{
            justifyContent: isAnotherDayLoading ? "center" : "flex-start",
          }}
        >
          {isAnotherDayLoading ? (
            <CircularProgress />
          ) : (
            <motion.div
              className="header_box-leaders"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {leadersAllTime[page].map((leader, index) => {
                return (
                  <LeaderItem
                    img={leader.img}
                    index={index}
                    key={index}
                    score={leader.score}
                    name={leader.name}
                  />
                );
              })}
            </motion.div>
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
