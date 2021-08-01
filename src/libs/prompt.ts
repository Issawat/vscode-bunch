import * as vscode from "vscode";
import { eventSubscriber } from "../utils/eventSubcriber";
import { getNumberOfChanges } from "../utils/getChanges";
import { getCurrentBranch } from "../utils/getCurrentBranch";
import { limitChecker } from "../utils/limitChecker";

const options = ["I know what I'm doing, hide this", "I got it"];

export const limitPrompt = async () => {
  const { deletions, insertions } = await getNumberOfChanges();
  const { deletionsExceed, insertionExceed, totalExceed } =
    await limitChecker();
  const currentBranch = (await getCurrentBranch()).replace(
    /(\r\n|\n|\r)/gm,
    ""
  );

  const configs = vscode.workspace.getConfiguration("bunch");
  const isByPass = Array.from(configs.whitelist).includes(currentBranch);

  if (isByPass) {
    return;
  }

  if (totalExceed) {
    vscode.window
      .showWarningMessage(
        `You've reached the total limit! (deletions + insertions = ${
          deletions + insertions
        })`,
        ...options
      )
      .then(handleShowAddToWhitelist);
  }

  if (deletionsExceed) {
    vscode.window
      .showWarningMessage(
        `You've reached the deletion limit! (-${deletions})`,
        ...options
      )
      .then(handleShowAddToWhitelist);
  }

  if (insertionExceed) {
    vscode.window
      .showWarningMessage(
        `You've reached the insertion limit! (+${insertions})`,
        ...options
      )
      .then(handleShowAddToWhitelist);
  }
};

const handleShowAddToWhitelist = async (value: string | undefined) => {
  if (value === options[0]) {
    const currentBranch = await getCurrentBranch();
    vscode.window.showInformationMessage(
      `If you want to bypass the check, please go to Settings > Extensions > Bunch and add this branch (${currentBranch}) to the whitelist`,
      ...["OK"]
    );
    vscode.commands.executeCommand(
      "workbench.action.openSettings",
      "bunch whitelist"
    );
  }
};

export const activateLimitPrompt = async (
  contenxt: vscode.ExtensionContext
) => {
  eventSubscriber(contenxt, limitPrompt);
  limitPrompt();
};
