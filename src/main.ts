import { commandHistory, outputBuffer, currentWorkingDirectory, hostname, inputBuffer, outputContainer } from "./globals";
import parseCommand from "./parser";
import { charBufferToString, stringToCharBuffer, tPrintln } from "./utils";

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

let historyWalkPosition = 0;
let runningCommand = false;

document.addEventListener("keydown", async (event) => {
    if (runningCommand) return;

    switch (event.key) {
        // ignore these keys for now
        case keyMap.shift:
            break;
        case keyMap.control:
            break;
        case keyMap.leftArrow:
            break;
        case keyMap.rightArrow:
            break;

        // actually used keys
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

        case keyMap.enter:
            let inputString = charBufferToString(inputBuffer.getValue())
            if (inputString === "") { tPrintln(`${hostname.getValue()}:${currentWorkingDirectory.getValue()}#`); return; }

            commandHistory.getValue().push(inputString);

            tPrintln(`${hostname.getValue()}:${currentWorkingDirectory.getValue()}#  ${inputString}`);
            inputBuffer.setValue([]);

            let command = parseCommand(inputString);
            if (command) { runningCommand = true; await command.exec(command.args); runningCommand = false; }

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
    function doFrameStuff() {
        let needsToScroll = false;

        if (outputBuffer.getValue().length > 0) {
            let containerPointer = outputContainer.getValue();
            let bufferPointer = outputBuffer.getValue();

            Array.prototype.push.apply(containerPointer, bufferPointer);
            outputBuffer.setValue([]);

            needsToScroll = true;
        }

        let inputLine = document.getElementById("input-line")!;
        let hostnameItem = document.getElementById("hostname")!;
        let cwdItem = document.getElementById("current-working-directory")!;
        let displayItem = document.getElementById("input-buffer-display")!;
        let historyItem = document.getElementById("history-buffer-display")!;

        hostnameItem.innerHTML = hostname.getValue();
        cwdItem.innerHTML = currentWorkingDirectory.getValue();
        displayItem.innerText = charBufferToString(inputBuffer.getValue());
        historyItem.innerText = charBufferToString(outputContainer.getValue());

        if (runningCommand) {
            inputLine.style.display = "none";
        } else {
            inputLine.style.display = "";
        }

        if (needsToScroll) window.scrollTo(0, document.body.scrollHeight);

        requestAnimationFrame(doFrameStuff);
    }

    requestAnimationFrame(doFrameStuff);
});

console.log("Hello, World!")