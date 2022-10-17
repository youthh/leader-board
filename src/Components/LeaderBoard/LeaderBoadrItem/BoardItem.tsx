import React from "react";
import { ILeader } from "../../Header/Leaders";
import person from "../../../images/person.svg";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import "./LeaderBoardItem.css";
const BoardItem = ({ score, name, index }: ILeader) => {
  return (
    <div className="board__item">
      <div className="board__item-left">
        <p>{index > 3 ? index + "rd" : index + "th"}</p>
        <img src={person} alt="" />
        <p>{score}</p>
        <p>{name}</p>
      </div>
      <div className="board__item-right">
        <p>No changes</p>
        <ModeEditIcon />
      </div>
    </div>
  );
};

export default BoardItem;
