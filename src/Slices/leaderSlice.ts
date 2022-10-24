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

type LeaderState = {
  leadersAllTime: Leader[];
  leaders: Leader[];
  isLoading: boolean;
  isAddedUserLoading: boolean;
};
const initialState: LeaderState = {
  leadersAllTime: [],
  leaders: [],
  isLoading: false,
  isAddedUserLoading: false,
};
const leaderSlice = createSlice({
  name: "leaderSlice",
  initialState,
  reducers: {
    onSaveScore: (
      state,
      action: PayloadAction<{ name: string; score: number }>
    ) => {
      state.leaders.map((leader) => {
        if (leader.name === action.payload.name) {
          leader.score = action.payload.score;
        }
      });
      const oldPositionLeaders: Leader[] = [...state.leaders];
      const color = randomColor[Math.floor(Math.random() * 12)];
      state.leaders
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
  },
  extraReducers: (builder) => {
    builder.addCase(getLeaderHeader.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLeaderHeader.fulfilled, (state, action) => {
      state.isLoading = false;
      state.leaders = action.payload
        .map(setLeaderField)
        .sort((previous, next) => {
          return next.score - previous.score;
        });

      state.leadersAllTime = state.leaders.filter(
        (leader: Leader, index: number) => {
          return index <= 3 && leader;
        }
      );
    });
    builder.addCase(getLeaderHeader.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addNewLeaderThunk.pending, (state) => {
      state.isAddedUserLoading = true;
    });
    builder.addCase(addNewLeaderThunk.fulfilled, (state, action) => {
      state.isAddedUserLoading = false;
      const name = action.payload["display-name"];
      state.leaders.push({
        name: name,
        score: 0,
        img: avatars[Math.floor(Math.random() * 8)],
        changesCount: 0,
        color: "",
      });
    });
  },
});

export const leaderSelector = (state: RootState) => {
  return {
    leadersAllTime: state.leaderSlice.leadersAllTime,
    isLoading: state.leaderSlice.isLoading,
    leaderBoard: state.leaderSlice.leaders,
    isAddedUserLoading: state.leaderSlice.isAddedUserLoading,
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

export const checkIfUserExist = (leaders: Leader[], name: string) => {
  for (const leader of leaders) {
    if (leader.name.toLowerCase() === name.toLowerCase()) {
      return true;
    }
  }
  return false;
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

export const { onSaveScore } = leaderSlice.actions;

export default leaderSlice.reducer;
