import { tPrint, tPrintln } from "../utils";

export function INFORMATION_load(): string {
    return `
    load - does a sudo load action to test async functionality
    load <items> <time_per_items (ms)>
    `
}

export async function COMMAND_load(args: string[]): Promise<number> {
    if (args.length < 3) { tPrintln("bad number of args"); return 1; }

    let itemCount = args[1];
    let timePerItem = args[2];

    let promise = new Promise((resolve) => {
        let counter = 1;

        tPrint("[");
        let interval = setInterval(() => {
            tPrint("#");
            if (counter >= Number(itemCount)) {
                resolve(0);
                clearInterval(interval);
                tPrintln("]");
            }
            counter += 1;
        }, Number(timePerItem));
    });

    await promise;
    return 0;
}