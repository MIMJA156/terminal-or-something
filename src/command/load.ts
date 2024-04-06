import { tPrintln, tPrint } from "../utils.js"

function wait(seconds: number) {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(0); }, seconds * 1000);
    })
}

export default {
    command: async function (args: string[]): Promise<number> {
        if (args.length < 3) { tPrintln("bad number of args"); return 1; }

        let count = Number(args[1]);
        let time = Number(args[2]);

        tPrintln("start");
        tPrint("[");

        for (let i = 0; i < count; i++) {
            tPrint("#");
            await wait(time);
        }

        tPrintln("]");
        tPrintln("done");

        return 0;
    }
}