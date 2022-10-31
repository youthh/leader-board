import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/store";
import { avatars } from "../images/Avatars/avatars";
import { addNewLeader, getTopLeaders } from "../api/leadersService";

export type Leader = {
  name: string;
  score: number;
  img: string;
  changesCount: number;
  color: string;
};

export const addNewLeaderThunk = createAsyncThunk(
  "leaderSlice/addNewLeaderThunk",
  async (name: string) => {
    return await addNewLeader(name);
  }
);
export const getLeaderHeader = createAsyncThunk(
  "leaderSlice/getLeaderHeader",
  async () => {
    return await getTopLeaders();
  }
);

export const addNewDay = createAsyncThunk("leaderSlice/addNewDay", async () => {
  return await getTopLeaders();
});

type LeaderState = {
  leadersAllTime: [Leader[]];
  maxScoreLeaders: [Leader[]];
  leaders: [Leader[]];
  isLoading: boolean;
  isAddedUserLoading: boolean;
  isAnotherDayLoading: boolean;
  page: number;
  currentDay: number;
};
const initialState: LeaderState = {
  leadersAllTime: [[]],
  leaders: [[]],
  maxScoreLeaders: [[]],
  isLoading: false,
  isAddedUserLoading: false,
  isAnotherDayLoading: false,
  page: 0,
  currentDay: 0,
};
const leaderSlice = createSlice({
  name: "leaderSlice",
  initialState,
  reducers: {
    onSaveScore: (
      state,
      action: PayloadAction<{ name: string; score: number }>
    ) => {
      state.maxScoreLeaders[state.page].map((leader) => {
        if (
          leader.name === action.payload.name &&
          leader.score < action.payload.score
        ) {
          leader.score = action.payload.score;
        }
      });
      state.leadersAllTime[state.page] = state.maxScoreLeaders[state.page]
        .sort((prev, next) => next.score - prev.score)
        .slice(0, 4);

      state.leaders[state.page].map((leader) => {
        if (leader.name === action.payload.name) {
          leader.score = action.payload.score;
        }
      });
      const oldPositionLeaders: Leader[] = [...state.leaders[state.page]];
      const color = randomColor[Math.floor(Math.random() * 12)];

      state.leaders[state.page]
        .sort((previous, next) => {
          return next.score - previous.score;
        })
        .map((leader, index) => {
          if (oldPositionLeaders.indexOf(leader) - index !== 0) {
            leader.changesCount = oldPositionLeaders.indexOf(leader) - index;
            leader.color = color;
          }
        });
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page += action.payload;
    },
    setLeadersLoading: (state, action: PayloadAction<boolean>) => {
      state.isAnotherDayLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLeaderHeader.pending, (state) => {
      state.isAnotherDayLoading = true;
      state.isLoading = true;
    });
    builder.addCase(getLeaderHeader.fulfilled, (state, action) => {
      state.isLoading = false;
      state.leaders[0] = action.payload
        .map(setLeaderField)
        .sort((previous, next) => {
          return next.score - previous.score;
        });
      state.maxScoreLeaders[state.page] = JSON.parse(
        JSON.stringify(state.leaders[0])
      );
      state.leadersAllTime[state.page] = state.leaders[0].slice(0, 4);
    });
    builder.addCase(addNewLeaderThunk.pending, (state) => {
      state.isAddedUserLoading = true;
    });
    builder.addCase(addNewLeaderThunk.fulfilled, (state, action) => {
      state.isAddedUserLoading = false;
      const name = action.payload["display-name"];
      state.leaders[state.page].push({
        name,
        score: 0,
        img: avatars[Math.floor(Math.random() * 8)],
        changesCount: 0,
        color: "",
      });
    });
    builder.addCase(addNewDay.pending, (state) => {
      state.isAnotherDayLoading = true;
    });
    builder.addCase(addNewDay.fulfilled, (state, action) => {
      state.isAnotherDayLoading = false;
      const leaders = action.payload
        .map(setLeaderField)
        .sort((previous, next) => {
          return next.score - previous.score;
        });
      state.leaders.push(leaders);
      state.leadersAllTime.push(leaders.slice(0, 4));
      state.maxScoreLeaders.push(JSON.parse(JSON.stringify(leaders)));
      state.page = state.leaders.length - 1;
    });
  },
});

export const leaderSelector = (state: RootState) => {
  return {
    leadersAllTime: state.leaderSlice.leadersAllTime,
    isLoading: state.leaderSlice.isLoading,
    leaderBoard: state.leaderSlice.leaders,
    page: state.leaderSlice.page,
    isAddedUserLoading: state.leaderSlice.isAddedUserLoading,
    isAnotherDayLoading: state.leaderSlice.isAnotherDayLoading,
  };
};

const setLeaderField = (leader: Leader, index: number) => {
  return Object.assign(leader, {
    img: avatars[index],
    color: "#F99746",
    changesCount: 0,
    score: Object.hasOwn(leader, "score") ? leader.score : 0,
  });
};

export const checkIfUserExist = (
  leaders: [Leader[]],
  name: string,
  page: number
) => {
  let isExist = false;
  leaders[page].forEach((leader) => {
    if (leader.name.toLowerCase() === name.toLowerCase()) {
      isExist = true;
    }
  });
  return isExist;
};

const randomColor = [
  "000000",
  "1D1CE5",
  "EA047E",
  "9A1663",
  "367E18",
  "D2001A",
  "A460ED",
  "472D2D",
  "554994",
  "F65A83",
  "59CE8F",
  "5BB318",
  "495C83",
];

export const { onSaveScore, setPage, setLeadersLoading } = leaderSlice.actions;

export default leaderSlice.reducer;
