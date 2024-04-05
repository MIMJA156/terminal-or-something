import { COMMAND_ls, INFORMATION_ls } from "./commands/ls";
import { COMMAND_clear, INFORMATION_clear } from "./commands/clear";
import { outputBuffer } from "./globals";
import { COMMAND_cd, INFORMATION_cd } from "./commands/cd";
import { stringToCharBuffer } from "./utils";

const registry: CommandRegistry = {
    "clear": COMMAND_clear,
    "ls": COMMAND_ls,
    "cd": COMMAND_cd
}

const infoRegistry: InformationRegistry = {
    "clear": INFORMATION_clear,
    "ls": INFORMATION_ls,
    "cd": INFORMATION_cd,
}

const topLevelCommandsRegistry: CommandRegistry = {
    "info": (args: string[]): number => {
        if (args.length < 2) { return 1; }

        let infoFunction = infoRegistry[args[1]];

        if (infoFunction !== undefined) {
            outputBuffer.setValue(stringToCharBuffer(infoFunction()));
            return 0
        } else {
            outputBuffer.setValue(stringToCharBuffer(`Unknown command "${args[1]}"`));
            return 1
        }
    }
}

export default function parseCommand(commandString: string): CommandUnit | null {
    let trimmedCommand = commandString.trim();
    let splitCommand = trimmedCommand.split(" ");
    let commandExec = splitCommand[0];

    let commandFunction = topLevelCommandsRegistry[commandExec] ?? registry[commandExec];

    if (commandFunction !== undefined) {
        return {
            exec: commandFunction,
            args: splitCommand
        };
    } else {
        outputBuffer.setValue(stringToCharBuffer(`Unknown command "${splitCommand[0]}"`));
        return null
    }
}