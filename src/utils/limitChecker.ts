import { getNumberOfChanges } from "./getChanges";
import * as vscode from "vscode";
import { Limit } from "../types/limit";

export const limitChecker = async (): Promise<Limit> => {
  const { deletions, insertions } = await getNumberOfChanges();
  const configs = vscode.workspace.getConfiguration("bunch");
  
  const limit = {
    insertionExceed: isLimitExceeded(configs.insertionChangesLimit, insertions),
    deletionsExceed: isLimitExceeded(configs.deletionChangesLimit, deletions),
    totalExceed: isLimitExceeded(
      configs.maxTotalChanges,
      deletions + insertions
    ),
  };

  return limit;
};

const isLimitExceeded = (configValue: number, value: number) => {
  if (!configValue) {
    return false;
  }
  return value >= configValue;
};
