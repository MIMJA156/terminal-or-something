import { commandHistory, commandOutput, currentWorkingDirectory, hostname, inputBuffer } from "./globals";
import parseCommand from "./parser";
import { charBufferToString, stringToCharBuffer } from "./utils";

const keyMap = {
    "enter": "Enter",
    "shift": "Shift",
    "backspace": "Backspace",
    "control": "Control",
    "leftArrow": "ArrowLeft",
    "rightArrow": "ArrowRight",
    "upArrow": "ArrowUp",
    "downArrow": "ArrowDown"
}

const inputBufferDisplay = document.getElementById("input-buffer-display");
if (inputBufferDisplay === null) throw Error("Bad Buffer Display");

function createNewHistoryLine(content: string) {
    let historyContainer = document.getElementById("history");
    if (historyContainer === null) return;

    let newLine = document.createElement("span");
    newLine.classList.add("terminal-line");
    newLine.classList.add("terminal-history");
    newLine.innerHTML = `${hostname.getValue()}:${currentWorkingDirectory.getValue()}#  ${content}`;

    historyContainer.appendChild(newLine);
}

function createNewOutputLine(content: string) {
    let historyContainer = document.getElementById("history");
    if (historyContainer === null) return;

    let newLine = document.createElement("span");
    newLine.classList.add("terminal-line");
    newLine.classList.add("terminal-history");
    newLine.innerHTML = `${content}`;

    historyContainer.appendChild(newLine);
}

let historyWalkPosition = 0;

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        // ignore these keys for now
        case keyMap.shift:
            break;
        case keyMap.control:
            break;

        case keyMap.upArrow: {
            let history = commandHistory.getValue();

            historyWalkPosition += 1;
            if (historyWalkPosition > history.length) { historyWalkPosition = history.length };
            let historyIndex = history.length - historyWalkPosition;
            let historyItem = history[historyIndex];

            if (historyItem === undefined) {
                inputBuffer.setValue([]);
            } else {
                inputBuffer.setValue(stringToCharBuffer(historyItem));
            }
            break;
        }

        case keyMap.downArrow: {
            let history = commandHistory.getValue();

            historyWalkPosition -= 1;
            if (historyWalkPosition < 1) { historyWalkPosition = 0; }
            let historyIndex = history.length - historyWalkPosition;
            let historyItem = history[historyIndex];

            if (historyItem === undefined) {
                inputBuffer.setValue([]);
            } else {
                inputBuffer.setValue(stringToCharBuffer(historyItem));
            }

            break;
        }

        case keyMap.leftArrow:
            break;
        case keyMap.rightArrow:
            break;

        // actually used keys
        case keyMap.enter:
            let inputString = charBufferToString(inputBuffer.getValue())
            if (inputString !== "") commandHistory.getValue().push(inputString);

            createNewHistoryLine(inputString);
            inputBuffer.setValue([]);

            let command = parseCommand(inputString);
            if (command) {
                let exitCode = command.exec(command.args);

                if (exitCode === 1) {
                    if (commandOutput.getValue() === "") {
                        createNewOutputLine(`exit code: ${exitCode}`)
                    } else {
                        createNewOutputLine(commandOutput.getValue());
                        commandOutput.setValue("");
                    }
                }

                if (exitCode === 0) {
                    createNewOutputLine(commandOutput.getValue());
                    commandOutput.setValue("");
                }
            }

            if (!command) {
                createNewOutputLine(commandOutput.getValue());
                commandOutput.setValue("");
            }

            historyWalkPosition = 0;

            break;


        case keyMap.backspace:
            inputBuffer.getValue().pop();
            break;

        default:
            inputBuffer.getValue().push(event.key);
            break;

    }
})

document.addEventListener("DOMContentLoaded", () => {
    function doAnimations() {
        let hostnameItem = document.getElementById("hostname")!;
        let cwdItem = document.getElementById("current-working-directory")!;
        let displayItem = document.getElementById("input-buffer-display")!;

        hostnameItem.innerHTML = hostname.getValue();
        cwdItem.innerHTML = currentWorkingDirectory.getValue();
        displayItem.innerText = charBufferToString(inputBuffer.getValue());

        requestAnimationFrame(doAnimations);
    }

    requestAnimationFrame(doAnimations);
});


console.log("Hello, World!")