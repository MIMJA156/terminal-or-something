import { outputBuffer } from "./globals";

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

export function tPrintln(msg: string) {
    let pointer = outputBuffer.getValue();
    let msgBuffer = stringToCharBuffer(`${msg}\n`);

    Array.prototype.push.apply(pointer, msgBuffer);
}

export function tPrint(msg: string) {
    let pointer = outputBuffer.getValue();
    let msgBuffer = stringToCharBuffer(`${msg}`);

    Array.prototype.push.apply(pointer, msgBuffer);
}

export class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }

    setValue(value: T): void {
        this.value = value;
    }
}