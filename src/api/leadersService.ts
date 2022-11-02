import { Leader } from "../Slices/leaderSlice";
import { instance } from "./axiosSetup";

export const getTopLeaders = (counter = 0): Promise<Leader[]> => {
  counter++;
  if (counter === 4) {
    return Promise.resolve([]);
  }
  return instance
    .get<Leader[]>("starting-state")
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return getTopLeaders(counter);
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
