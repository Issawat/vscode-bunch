import * as vscode from "vscode";
import { limitPrompt } from "./prompt";
import { updateStatusBar } from "./statusBar";

const settings = () => {
  vscode.commands.executeCommand("workbench.action.openSettings", "bunch");
};

const addWhitelist = () => {
  vscode.commands.executeCommand(
    "workbench.action.openSettings",
    "bunch Whitelist"
  );
};

const setTargetBranch = () => {
  vscode.commands.executeCommand(
    "workbench.action.openSettings",
    "bunch Target Branch"
  );
};

const recheck = () => {
  limitPrompt();
};

export const registerCommands = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.commands.registerCommand("bunch.settings", settings)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("bunch.addWhitelist", addWhitelist)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("bunch.setTargetBranch", setTargetBranch)
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("bunch.recheck", recheck)
  );
};
