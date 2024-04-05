import { outputBuffer, outputContainer } from "../globals";

export function INFORMATION_clear(): string {
    return `
    clear - clears all lines from the terminal
    `
}

export function COMMAND_clear(_args: string[]): number {
    outputBuffer.setValue([]);
    outputContainer.setValue([]);
    return 0;
}