import { Leader, randomColor } from "../../Slices/leaderSlice";
import { avatars } from "../../images/Avatars/avatars";

export const onSaveScoreLogic = {
  changeHighestScore: (
    leaders: Leader[],
    payload: { name: string; score: number }
  ) => {
    return leaders
      .map((leader) => {
        if (leader.name === payload.name && leader.score < +payload.score) {
          leader.score = +payload.score;
        }

        return leader;
      })
      .sort((previous, next) => {
        return next.score - previous.score;
      });
  },
  changeLeaderScore: (
    leaders: Leader[],
    payload: { name: string; score: number }
  ) => {
    return leaders.map((leader) => {
      if (leader.name === payload.name) {
        leader.score = payload.score;
      }

      return leader;
    });
  },
  checkLeaderPosition: (leadersPrevDay: Leader[], leadersNewDay: Leader[]) => {
    const color = randomColor[Math.floor(Math.random() * 12)];

    return leadersNewDay
      .sort((prev, next) => {
        return next.score - prev.score;
      })
      .map((leaderNew, indexNewDay) => {
        leadersPrevDay.map((leaderPrevDay, indexPrevDay) => {
          if (
            leaderPrevDay.name === leaderNew.name &&
            indexPrevDay - indexNewDay !== 0
          ) {
            leaderNew.changesCount = indexPrevDay - indexNewDay;
            leaderNew.color = color;
          }
        });

        return leaderNew;
      });
  },
};

export const addFieldAndSort = (leaders: Leader[]) => {
  return leaders.map(setLeaderField).sort((previous, next) => {
    return next.score - previous.score;
  });
};

const setLeaderField = (leader: Leader, index: number) => {
  return Object.assign(leader, {
    img: avatars[index],
    color: "#F99746",
    changesCount: 0,
    score: Object.hasOwn(leader, "score") ? leader.score : 0,
  });
};
