import React from "react";
import "./_header.css";

export interface LeaderItemProps {
  score: number;
  name: string;
  index: number;
  img: string;
}

const LeaderItem = ({ score, name, img }: LeaderItemProps) => {
  return (
    <div className="header__leader-item" key={Math.random()}>
      <div>
        <img className="header__img_avatar" src={img} alt="" />
      </div>
      <div>
        <h6 className={"header__leader-item-name"}>
          {name} - {score}
        </h6>
      </div>
    </div>
  );
};

export default LeaderItem;
