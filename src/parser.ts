import { COMMAND_ls, INFORMATION_ls } from "./commands/ls";
import { COMMAND_clear, INFORMATION_clear } from "./commands/clear";
import { COMMAND_cd, INFORMATION_cd } from "./commands/cd";
import { tPrintln } from "./utils";
import { COMMAND_load } from "./commands/load";

const registry: CommandRegistry = {
    "clear": COMMAND_clear,
    "ls": COMMAND_ls,
    "cd": COMMAND_cd,
    "load": COMMAND_load
}

const infoRegistry: InformationRegistry = {
    "clear": INFORMATION_clear,
    "ls": INFORMATION_ls,
    "cd": INFORMATION_cd,
}

const topLevelCommandsRegistry: CommandRegistry = {
    "info": async (args: string[]): Promise<number> => {
        if (args.length < 2) { return 1; }

        let infoFunction = infoRegistry[args[1]];

        if (infoFunction !== undefined) {
            tPrintln(infoFunction());
            return 0
        } else {
            tPrintln(`Unknown command "${args[1]}"`);
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
        tPrintln(`Unknown command "${splitCommand[0]}"`);
        return null
    }
}