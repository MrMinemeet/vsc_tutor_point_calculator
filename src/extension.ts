// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext): void {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('TUTOR Point Calculator is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const calculatePointsDisposable = vscode.commands.registerCommand('tutor-point-calculator.calculatepoints', () => {
		// The code you place here will be executed every time your command is executed

		// Get files from current workspace
		let files = fetchFiles(getWorkspace());

		// Filter files which are not set to be checked
		const allowedFiles = vscode.workspace.getConfiguration('tutor-point-calculator').get('filesToCheck') as Array<string>;
		const ingoredFiles = vscode.workspace.getConfiguration('tutor-point-calculator').get('filesToIgnore') as Array<string>;

		files = files.filter((file) => {
			// Check if the file ends with one of the allowed file extensions and are not in the ignore list
			return allowedFiles.some((extension) => file.endsWith(extension)) && !ingoredFiles.some((ignore) => file.endsWith(ignore));
		});
		
		// Evaluate each file
		let pointReduction = 0;

		files.forEach((file) => {
			pointReduction += evaluateFile(file);
		});

		const maxPointsToGet = vscode.workspace.getConfiguration("tutor-point-calculator").get("maxPoints") as number;

		// Display the result
		vscode.window.showInformationMessage('Points to give: ' + (maxPointsToGet - Math.abs(pointReduction)));
	});
	context.subscriptions.push(calculatePointsDisposable);


	const changeMaxPointsDisposable = vscode.commands.registerCommand('tutor-point-calculator.changemaxpoints', () => {
		// Open input box to get new max points
		vscode.window.showInputBox({
			prompt: "Enter new max points",
			value: vscode.workspace.getConfiguration("tutor-point-calculator").get("maxPoints") as string
		}).then((value) => {
			if (!value) {
				// Check if something was entered
				vscode.window.showErrorMessage("No value was entered!");
			} else if (isNaN(parseFloat(value))) {
				// Check if the value is a number
				vscode.window.showErrorMessage("The value is not a number!");
			} else if (parseFloat(value) <= 0) {
				// Check if the value is greater than 0
				vscode.window.showErrorMessage("The value is not greater than 0!");
			} else {
				// Set the new value
				const newValue = parseFloat(value);
				vscode.workspace.getConfiguration("tutor-point-calculator").update("maxPoints", newValue, true);
				vscode.window.showInformationMessage("Max points set to " + newValue);
			}
		});
	});

	context.subscriptions.push(changeMaxPointsDisposable);
}

// This method is called when your extension is deactivated
//export function deactivate() {}

// Get current workspace path
function getWorkspace(): string {
	const workspaces = vscode.workspace.workspaceFolders;
	return (workspaces) ? workspaces[0].uri.fsPath : "./";
}


// Fetches all files files recursivly in a folder
function fetchFiles(path: string, files: string[] = []): string[] {
	const currDir = fs.readdirSync(path, { withFileTypes: true });

	// Go through "files" in current directory and add them to the list or recurse into them if they are directories
	currDir.forEach((file) => {
		if (file.isDirectory()) {
			files = fetchFiles(path + '/' + file.name, files);
		} else {
			files.push(path + '/' + file.name);
		}
	});
	return files;
}

function evaluateFile(path: string): number {
	// Get comment marker
	const commentMarker = vscode.workspace.getConfiguration("tutor-point-calculator").get("commentMarker") as string;
	if (!commentMarker) {
		vscode.window.showErrorMessage("Comment marker not set!");
	}

	// Open file and read it as a string array
	const fileContent = fs.readFileSync(path, 'utf8').toString().split("\n");

	// Loop over lines in the file and look for comment markers
	const possibleGrading = [];
	for (const line of fileContent) {
		if (line.includes(commentMarker)) {
			// Split to only get the comment and store that
			possibleGrading.push(line.split(commentMarker)[1]);
		}
	}

	// Look lines that are like "TUTOR -xy:" using regex where XY is a whole number or a decimal number
	let pointReduction = 0;
	const regex = /\s*TUTOR\s*-\d+(\.\d+)?\s*[Pp]:/g;
	for (const line of possibleGrading) {
		line.match(regex)?.forEach((match) => {
			// Extract the number after the "-" and add it to the point reduction
			const number = match.match(/-\d+(\.\d+)?/g);
			if (number != null) {
				pointReduction += parseFloat(number[0]);
			}
		});
	}
	return pointReduction;
}