import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/store";
import { getTopLeaders } from "../api/leadersSerive";
import { avatars } from "../images/Avatars/avatars";

export type Leader = {
  name: string;
  score: number;
  img: string;
};

export const getLeaderHeader = createAsyncThunk(
  "leader/getLeaderHeader",
  async () => {
    return await getTopLeaders();
  }
);

type LeaderState = {
  leadersAllTime: Leader[];
  leaders: Leader[];
  isLoading: boolean;
  isSuccess: boolean;
};

const initialState: LeaderState = {
  leadersAllTime: [],
  leaders: [],
  isLoading: false,
  isSuccess: false,
};

const leaderSlice = createSlice({
  name: "leader",
  initialState,
  reducers: {
    setLeaders: (state, action: PayloadAction<Leader[]>) => {
      state.leaders = [...action.payload];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getLeaderHeader.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLeaderHeader.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.leaders = action.payload
        .sort((previous: Leader, next: Leader) => {
          if (!Object.hasOwn(previous, "score")) {
            return next.score;
          } else if (!Object.hasOwn(next, "score")) {
            return 0 - previous.score;
          } else {
            return next.score - previous.score;
          }
        })
        .map(setLeaderAvatar);

      state.leadersAllTime = state.leaders.filter(
        (item: Leader, index: number) => {
          return index <= 3 && item;
        }
      );
    });
    builder.addCase(getLeaderHeader.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const leaderSelector = (state: RootState) => {
  return {
    leaders: state.leaderSlice.leadersAllTime,
    isLoading: state.leaderSlice.isLoading,
    isSuccess: state.leaderSlice.isSuccess,
    leaderBoard: state.leaderSlice.leaders,
  };
};

const setLeaderAvatar = (leader: Leader, index: number) => {
  return Object.assign(leader, {
    img: avatars[index],
  });
};

export const { setLeaders } = leaderSlice.actions;

export default leaderSlice.reducer;
