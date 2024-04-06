import { tPrintln } from "../utils";

export default {
    command: async function (args: string[]): Promise<number> {
        if (args.length < 2) { tPrintln("bad number of args"); return 1; }
        let string = "";

        args.forEach((v, i) => {
            if (i === 0) return;
            string = `${string + v + " "}`;
        })

        tPrintln(`${string}`);

        return 0
    }
}