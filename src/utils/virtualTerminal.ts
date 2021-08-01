import * as ChildProcess from "child_process";
import * as vscode from "vscode";

export const virtualTerminal = (command: string) =>
  new Promise<string>((resolve, reject) => {
    const currentDir = vscode.workspace.workspaceFolders?.[0].uri.path;
    const commandWithWrapper = `cd ${currentDir} && ${command}`;
    
    ChildProcess.exec(commandWithWrapper, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      return resolve(stdout);
    });
  });
