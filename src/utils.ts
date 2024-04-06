import { stdout } from "./globals";

export interface StringToStringMap {
    [key: string]: string;
}

export interface StringToFunctionMap {
    [key: string]: (args: string[]) => Promise<number>;
}

export function charBufferToString(charBuffer: string[]) {
    let string = "";

    charBuffer.forEach((char) => {
        if (char !== undefined) string += char;
    });

    return string;
}

export function stringToCharBuffer(str: string) {
    let charBuffer: string[] = [];

    str.split("").forEach((char) => {
        charBuffer.push(char);
    });

    return charBuffer;
}

export function tPrint(msg: string) {
    if (isWorker()) {
        stringToCharBuffer(`${msg}`).forEach((char) => {
            postMessage({
                type: "push",
                value: char
            });
        })
    } else {
        let pointer = stdout.getValue();
        let msgBuffer = stringToCharBuffer(`${msg}`);

        Array.prototype.push.apply(pointer, msgBuffer);
    }
}

export function tPrintln(msg: string) {
    tPrint(`${msg}\n`);
}

function isWorker() {
    //@ts-ignore
    return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope
}