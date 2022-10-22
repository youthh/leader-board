import React from "react";
import edit from "../../../images/edit.svg";
import "./LeaderBoardItem.css";

type BorderItemProps = {
  score: number;
  name: string;
  index: number;
  img: string;
};

const BoardItem = ({ score, name, index, img }: BorderItemProps) => {
  return (
    <div className="board__item">
      <div className="board__item-left">
        <p className="board__item--position">
          {index > 3 ? index + "rd" : index + "th"}
        </p>
        <img className="board__item--img" src={img} alt="" />
        <p className="board__item--score">{score}</p>
        <p className="board__item--name">{name}</p>
      </div>
      <div className="board__item-right">
        <p className={"board__item--textChanges"}>No changes</p>
        <img className="edit__btn" src={edit} alt="" />
      </div>
    </div>
  );
};

export default BoardItem;
