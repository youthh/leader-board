import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/store";
import { avatars } from "../images/Avatars/avatars";
import { addNewLeader, getTopLeaders } from "../api/leadersService";
import { addFieldAndSort, onSaveScoreLogic } from "../Logic/logicLeaderSlice";

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
  leaders: [Leader[]];
  isLoading: boolean;
  isAddedUserLoading: boolean;
  isAnotherDayLoading: boolean;
  page: number;
};
const initialState: LeaderState = {
  leadersAllTime: [[]],
  leaders: [[]],
  isLoading: false,
  isAddedUserLoading: false,
  isAnotherDayLoading: false,
  page: 0,
};
const leaderSlice = createSlice({
  name: "leaderSlice",
  initialState,
  reducers: {
    onSaveScore: (
      state,
      action: PayloadAction<{ name: string; score: number }>
    ) => {
      state.leadersAllTime[state.page] = onSaveScoreLogic.changeHighestScore(
        state.leadersAllTime[state.page],
        action.payload
      );

      state.leaders[state.page] = onSaveScoreLogic.changeLeaderScore(
        state.leaders[state.page],
        action.payload
      );
      const oldPositionLeaders: Leader[] = [...state.leaders[state.page]];

      state.leaders[state.page] = onSaveScoreLogic.checkLeaderPosition(
        oldPositionLeaders,
        state.leaders[state.page]
      );
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
      state.leaders[0] = addFieldAndSort(action.payload);
      state.leadersAllTime = JSON.parse(JSON.stringify(state.leaders));
    });
    builder.addCase(addNewLeaderThunk.pending, (state) => {
      state.isAddedUserLoading = true;
    });
    builder.addCase(addNewLeaderThunk.fulfilled, (state, action) => {
      state.isAddedUserLoading = false;

      const leader = {
        name: action.payload["display-name"].toLowerCase(),
        score: 0,
        img: avatars[Math.floor(Math.random() * 8)],
        changesCount: 0,
        color: "",
      };
      state.leaders[state.page].push(leader);
      state.leadersAllTime[state.page].push(JSON.parse(JSON.stringify(leader)));
    });
    builder.addCase(addNewDay.pending, (state) => {
      state.isAnotherDayLoading = true;
    });
    builder.addCase(addNewDay.fulfilled, (state, action) => {
      state.isAnotherDayLoading = false;
      const leaders = addFieldAndSort(action.payload);
      state.leaders.push(
        onSaveScoreLogic.checkLeaderPosition(state.leaders[state.page], leaders)
      );
      state.leadersAllTime.push(JSON.parse(JSON.stringify(leaders)));
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

export const { onSaveScore, setPage, setLeadersLoading } = leaderSlice.actions;

export default leaderSlice.reducer;
