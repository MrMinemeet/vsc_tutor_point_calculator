"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "tutor-point-calculator" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('tutor-point-calculator.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hi');
        // Get current workspace
        let files = fetchFiles(getWorkspace());
        // Filter files to only include .java files
        files = files.filter((file) => {
            return file.endsWith('.java') && !file.endsWith('In.java') && !file.endsWith('Out.java');
        });
        // Evaluate each file
        let pointReduction = 0;
        // TODO: Evaluate each file
        // Display the result
        vscode.window.showInformationMessage('Point reduction: ' + pointReduction);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
// Get current workspace path
function getWorkspace() {
    const workspaces = vscode.workspace.workspaceFolders;
    if (workspaces == undefined) {
        return "";
    }
    else {
        return workspaces[0].uri.fsPath;
    }
}
// Fetches all files files recursivly in a folder
function fetchFiles(path, files = []) {
    const dir = fs.readdirSync(path, { withFileTypes: true });
    dir.forEach((file) => {
        if (file.isDirectory()) {
            files = fetchFiles(path + '/' + file.name, files);
        }
        else {
            files.push(path + '/' + file.name);
        }
    });
    return files;
}
//# sourceMappingURL=extension.js.map