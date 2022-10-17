import React from "react";
import "./header.css";
import person from "../../images/person.svg";
export interface ILeader {
  score: number | 0;
  name: string;
  index: number;
}

const LeaderItem = ({ score, name }: ILeader) => {
  return (
    <div className="header__leader-item" key={Math.random()}>
      <div>
        <img src={person} alt="" />
      </div>
      <div>
        <h6>
          {name} - {score}
        </h6>
      </div>
    </div>
  );
};

export default LeaderItem;
