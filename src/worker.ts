import clear from "./command/clear";
import load from "./command/load";
import { StringToFunctionMap } from "./utils";

const map: StringToFunctionMap = {
    "COMMAND_load": load.command,
    "COMMAND_clear": clear.command
}

self.onmessage = async function (message) {
    if (message.data.type === "begin_command") {
        let args = message.data.args as string[];
        let commandId = message.data.commandId as string;

        let code = await map[commandId](args);
        postMessage({ type: "exit", code });
    }
}