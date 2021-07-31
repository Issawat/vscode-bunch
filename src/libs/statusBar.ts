import * as vscode from "vscode";
import { getNumberOfChanges } from "../utils/getChanges";

export const activateStatusBar = async ({
  subscriptions,
}: vscode.ExtensionContext) => {
  const statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1
  );
  statusBarItem.command = "bunch.showStatusBar";
  subscriptions.push(statusBarItem);

  const statusBarUpdater = updateStatusBarItem(statusBarItem);
  subscriptions.push(vscode.workspace.onDidSaveTextDocument(statusBarUpdater));

  statusBarUpdater();
};

const updateStatusBarItem = (statusBar: vscode.StatusBarItem) => async () => {
  const changes = await getNumberOfChanges();
  statusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    statusBar.text = `$(files) ${changes?.files}, $(add) ${changes?.insertions}, $(remove) ${changes?.deletions}`;
  statusBar.show();
};
