import { parseAndExec } from "./exec";
import { stdin, stdout } from "./globals";
import { charBufferToString, tPrint, tPrintln } from "./utils";

console.log("Hello, World!");

let terminalTextOutputContainer = document.getElementById("terminal-text-display")!;

let inputBufferIsLocked = false;
let currentWorkingDirectory = "/";
let currentUser = "mimja";
let hostname = "machine";

const commandContext = () => {
    return `${currentUser}@${hostname}:${currentWorkingDirectory}#  `
}

tPrint(commandContext());


document.addEventListener("keydown", async (event) => {
    if (inputBufferIsLocked) return;

    switch (event.key) {
        case "Shift":
            break;

        case "Enter":
            let input = stdin.getValue();
            let inputString = charBufferToString(input);

            tPrintln(inputString);
            stdin.setValue([]);

            inputBufferIsLocked = true;
            await parseAndExec(inputString);
            inputBufferIsLocked = false;

            tPrint(commandContext());
            break;

        case "Backspace":
            stdin.getValue().pop();
            break;

        default:
            stdin.getValue().push(event.key);
            break;
    }
});

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        default:
            break;
    }
});

function doSomeFrameStuff() {
    terminalTextOutputContainer.innerText =
        charBufferToString(stdout.getValue()) + charBufferToString(stdin.getValue());

    requestAnimationFrame(doSomeFrameStuff);
}

requestAnimationFrame(doSomeFrameStuff);