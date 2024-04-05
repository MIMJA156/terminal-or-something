import { tPrint, tPrintln } from "../utils";

export async function COMMAND_load(args: string[]): Promise<number> {
    if (args.length < 3) { tPrintln("bad number of args"); return 1; }

    let itemCount = args[1];
    let timePerItem = args[2];

    let a = new Promise((resolve) => {
        let ac = 1;

        tPrint("[");
        let int = setInterval(() => {
            tPrint("#");
            if (ac >= Number(itemCount)) { resolve("asd"); clearInterval(int); tPrint("]"); }
            ac += 1;

            console.log(ac);
        }, Number(timePerItem));
    });

    await a;
    return 0;
}