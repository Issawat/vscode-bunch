import * as vscode from "vscode";

export const eventSubscriber = (
  { subscriptions }: vscode.ExtensionContext,
  updater: () => Promise<void>
) => {
  subscriptions.push(vscode.workspace.onDidSaveTextDocument(updater));
  subscriptions.push(vscode.workspace.onDidChangeConfiguration(updater));
  subscriptions.push(vscode.workspace.onDidChangeTextDocument(updater));
  subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders(updater));
  subscriptions.push(vscode.workspace.onDidRenameFiles(updater));
  subscriptions.push(vscode.workspace.onDidCreateFiles(updater));
  subscriptions.push(vscode.workspace.onDidDeleteFiles(updater));
};
