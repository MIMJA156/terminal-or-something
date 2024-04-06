import { stdout } from "./globals";
import { StringToStringMap, tPrintln } from "./utils";

const commands: StringToStringMap = {
    "load": "COMMAND_load",
    "clear": "COMMAND_clear",
    "echo": "COMMAND_echo"
}

export function parseAndExec(input: string): Promise<number> {
    let promise: Promise<number> = new Promise((resolve) => {
        let args = input.split(" ");
        let commandId = commands[args[0]];

        if (commandId === undefined) {
            tPrintln(`unknown command: ${args[0]}`);
            return resolve(1);
        }

        let worker = new Worker(new URL('./worker.ts', import.meta.url), {
            type: "module"
        });

        worker.postMessage({
            type: "begin_command",
            args,
            commandId
        });

        worker.onmessage = function (msg) {
            // console.log("message: ", msg);

            switch (msg.data.type) {
                case "push":
                    stdout.getValue().push(msg.data.value);
                    break;

                case "exit":
                    worker.terminate();
                    resolve(msg.data.code);
                    break;

                case "stdout_set":
                    stdout.setValue(msg.data.data ?? []);
                    break;
            }
        }

        worker.onmessageerror = function (ev) {
            console.log("messageerror: ", ev);
        }

        worker.onerror = function (ev) {
            console.log("error: ", ev);
        }
    })

    return promise;
}