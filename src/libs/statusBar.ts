import * as vscode from "vscode";
import { eventSubscriber } from "../utils/eventSubcriber";
import { getNumberOfChanges } from "../utils/getChanges";
import { limitChecker } from "../utils/limitChecker";

export const updateStatusBar =
  (statusBar: vscode.StatusBarItem) => async () => {
    const { deletions, insertions, files } = await getNumberOfChanges();
    const { deletionsExceed, totalExceed, insertionExceed } =
      await limitChecker();

    if (deletionsExceed || totalExceed || insertionExceed) {
      statusBar.backgroundColor = new vscode.ThemeColor(
        "statusBarItem.errorBackground"
      );
    } else {
      statusBar.backgroundColor = undefined;
    }

    statusBar.text = `Bunch! $(files) ${files}, $(add) ${insertions}, $(remove) ${deletions}`;
    statusBar.show();
  };

export const activateStatusBar = async (context: vscode.ExtensionContext) => {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1
  );

  statusBarItem.command = "bunch.recheck";
  context.subscriptions.push(statusBarItem);

  const statusBarUpdater = updateStatusBar(statusBarItem);
  eventSubscriber(context, statusBarUpdater);
  statusBarUpdater();
};
