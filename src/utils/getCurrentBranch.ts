import { virtualTerminal } from "./virtualTerminal";

export const getCurrentBranch = async (): Promise<string> => {
  const result = await virtualTerminal("git branch --show-current");
  return result;
};
