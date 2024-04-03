import COMMAND_list from "./commands/list";
import COMMAND_clear from "./commands/clear";
import { commandOutput } from "./globals";
import COMMAND_cd from "./commands/cd";

const registry: CommandRegistry = {
    "clear": COMMAND_clear,
    "ls": COMMAND_list,
    "cd": COMMAND_cd
}

export default function parseCommand(command: string): Command | null {
    let trimmedCommand = command.trim();
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