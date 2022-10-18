import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/store";
import { getTopLeaders } from "../api/axiosSetup";
import { avatars } from "../images/Avatars/avatars";

export type Leader = {
  name: string;
  score: number | 0;
  img: string;
};

export const getLeaderHeader = createAsyncThunk(
  "header/getLeaderHeader",
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
  name: "header",
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
        .sort((a: Leader, b: Leader) => {
          if (!Object.hasOwn(a, "score")) {
            return b.score - 0;
          } else if (!Object.hasOwn(b, "score")) {
            return 0 - a.score;
          } else {
            return b.score - a.score;
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

const setLeaderAvatar = (item: Leader, index: number) => {
  index++;
  return Object.assign(item, {
    img: avatars[index],
  });
};

export const { setLeaders } = leaderSlice.actions;

export default leaderSlice.reducer;
