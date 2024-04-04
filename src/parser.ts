import { COMMAND_ls } from "./commands/ls";
import { COMMAND_clear } from "./commands/clear";
import { commandOutput } from "./globals";
import { COMMAND_cd } from "./commands/cd";

const registry: CommandRegistry = {
    "clear": COMMAND_clear,
    "ls": COMMAND_ls,
    "cd": COMMAND_cd
}

export default function parseCommand(commandString: string): CommandUnit | null {
    let trimmedCommand = commandString.trim();
    let splitCommand = trimmedCommand.split(" ");
    let commandExec = splitCommand[0];

    let commandFunction = registry[commandExec];

    if (commandFunction !== undefined) {
        return {
            exec: commandFunction,
            args: splitCommand
        };
    } else {
        commandOutput.setValue(`Unknown command "${splitCommand[0]}"`);
        return null
    }
}