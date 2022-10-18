import React from "react";
import { ILeader } from "../../Header/Leaders";
import edit from "../../../images/edit.svg";
import "./LeaderBoardItem.css";

type props = {
  score: number;
  name: string;
  index: number;
  img: string;
  onClickEdit: any;
};

const BoardItem = ({ score, name, index, img, onClickEdit }: props) => {
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
        <img
          onClick={() => {
            onClickEdit(name, score);
          }}
          className="edit__btn"
          src={edit}
          alt=""
        />
      </div>
    </div>
  );
};

export default BoardItem;
