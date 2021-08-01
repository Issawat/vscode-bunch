import { virtualTerminal } from "./virtualTerminal";
import * as vscode from "vscode";
import { getStatNumber } from "./getStatNumber";
import { Stats } from "../types/stats";

export const getNumberOfChanges = async (
  baseBranch?: string
): Promise<Stats> => {
  const branchToCompare =
    baseBranch ?? vscode.workspace.getConfiguration("bunch").targetBranch;

  const result = await virtualTerminal(
    `git --no-pager diff --shortstat ${branchToCompare}`
  );

  const changes = result.split(",");

  const deletions = getStatNumber(changes, "deletion");
  const insertions = getStatNumber(changes, "insertion");
  const files = getStatNumber(changes, "file");

  return {
    deletions,
    insertions,
    files,
  };
};
