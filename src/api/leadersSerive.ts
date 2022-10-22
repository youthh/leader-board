import { Leader } from "../Slices/leaderSlice";
import { instance } from "./axiosSetup";

export const getTopLeaders = (): Promise<Leader[]> => {
  return instance
    .get<Leader[]>("starting-state")
    .then((data) => {
      return data.data;
    })
    .catch(() => {
      return getTopLeaders();
    });
};
