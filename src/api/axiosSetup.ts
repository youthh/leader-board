import axios from "axios";
import { Leader } from "../Slices/leaderSlice";

const instance = axios.create({
  baseURL: "http://coding-test.cube19.io/frontend/v1/",
});

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
