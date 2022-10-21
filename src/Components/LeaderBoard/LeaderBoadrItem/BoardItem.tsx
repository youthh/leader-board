import React from "react";
import edit from "../../../images/edit.svg";
import "./LeaderBoardItem.css";
import { setModal } from "../../../Slices/modalSice";
import { useDispatch } from "react-redux";

type BoardItemProps = {
  score: number;
  name: string;
  index: number;
  changesCount: number;
  img: string;
  color: string;
};

const BoardItem = ({
  score,
  name,
  index,
  img,
  changesCount,
  color,
}: BoardItemProps) => {
  const dispatch = useDispatch();
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
        <p
          className={"board__item--textChanges"}
          style={{ color: "#" + color }}
        >
          {changesCount === 0 ? "no changes" : changesCount + " places"}
        </p>
        <img
          onClick={() => {
            dispatch(setModal({ name, score }));
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
