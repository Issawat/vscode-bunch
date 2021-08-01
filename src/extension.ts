import * as vscode from "vscode";
import { activateStatusBar } from "./libs/statusBar";

export const activate = (context: vscode.ExtensionContext) => {
  activateStatusBar(context);
};

export const deactivate = () => {};
