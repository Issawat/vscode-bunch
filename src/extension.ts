import * as vscode from "vscode";
import { activateLimitPrompt } from "./libs/prompt";
import { activateStatusBar } from "./libs/statusBar";

export const activate = (context: vscode.ExtensionContext) => {
  activateStatusBar(context);
  activateLimitPrompt(context);
};

export const deactivate = () => {};
