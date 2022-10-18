import React from "react";
import "./header.css";
export interface ILeader {
  score: number | 0;
  name: string;
  index: number;
  img: string;
}

const LeaderItem = ({ score, name, img }: ILeader) => {
  return (
    <div className="header__leader-item" key={Math.random()}>
      <div>
        <img src={img} alt="" />
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
