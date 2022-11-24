"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('TUTOR Point Calculator is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const disposable = vscode.commands.registerCommand('tutor-point-calculator.calculatepoints', () => {
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
        files.forEach((file) => {
            pointReduction += evaluateFile(file);
        });
        // Display the result
        vscode.window.showInformationMessage('Point reduction: ' + pointReduction);
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// This method is called when your extension is deactivated
//export function deactivate() {}
// Get current workspace path
function getWorkspace() {
    const workspaces = vscode.workspace.workspaceFolders;
    return (workspaces == undefined) ? "" : workspaces[0].uri.fsPath;
}
// Fetches all files files recursivly in a folder
function fetchFiles(path, files = []) {
    const currDir = fs.readdirSync(path, { withFileTypes: true });
    // Go through "files" in current directory and add them to the list or recurse into them if they are directories
    currDir.forEach((file) => {
        if (file.isDirectory()) {
            files = fetchFiles(path + '/' + file.name, files);
        }
        else {
            files.push(path + '/' + file.name);
        }
    });
    return files;
}
function evaluateFile(path) {
    // Open file and read it as a string
    const fileContent = fs.readFileSync(path, 'utf8').toString();
    // Look for comments that are like "// TUTOR -xy:" using regex where XY is a whole number or a decimal number
    let pointReduction = 0;
    const regex = /\/\/\s*TUTOR\s*-\d+(\.\d+)?\s*:/g;
    fileContent.match(regex)?.forEach((match) => {
        // Extract the number after the "-" and add it to the point reduction
        const number = match.match(/-\d+(\.\d+)?/g);
        if (number != null) {
            pointReduction += parseFloat(number[0]);
        }
    });
    return pointReduction;
}
//# sourceMappingURL=extension.js.map