import * as vscode from "vscode";
import { registerCommands } from "./libs/commands";
import { activateLimitPrompt } from "./libs/prompt";
import { activateStatusBar } from "./libs/statusBar";

export const activate = (context: vscode.ExtensionContext) => {
  activateStatusBar(context);
  activateLimitPrompt(context);
  registerCommands(context);
};

export const deactivate = () => {};
