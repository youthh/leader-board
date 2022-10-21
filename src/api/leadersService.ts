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

export const addNewLeader = (
  name: string
): Promise<{ "display-name": string }> => {
  return instance
    .post("process-user", {
      username: name,
    })
    .then((data) => {
      return data.data;
    })
    .catch(() => {
      return addNewLeader(name);
    });
};
