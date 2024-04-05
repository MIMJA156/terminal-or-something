import { outputBuffer, currentWorkingDirectory } from "../globals";
import fileSystem from "../fileSystem.json"
import { stringToCharBuffer, tPrintln } from "../utils";

export function INFORMATION_cd(): string {
    return `
    cd - allows you to move directors
    `
}

export function COMMAND_cd(args: string[]): number {
    if (args.length < 2) { tPrintln("bad number of args"); return 1; }

    let cwd = currentWorkingDirectory.getValue();
    let cwdPath = cwd.split("/").filter((item) => item !== "");
    cwdPath.splice(0, 0, "");

    let cdPath = args[1];
    let pathArray = cdPath.split("/").filter((item) => item !== "");

    // parses the new path and returns it
    function internal(path: string[], depth: number, cwd: string[]): string[] {
        if (path.length === 0) {
            if (cwd[cwd.length - 1] === ".") {
                cwd.pop();
            }

            return cwd;
        }

        if (path[depth] === "..") {
            let cwdCopy = [...cwd];
            cwdCopy.pop();

            let pathCopy = [...path];
            pathCopy.splice(0, 1);

            return internal(pathCopy, depth + 1, cwdCopy);
        } else if (path[depth] === ".") {
            let pathCopy = [...path];
            pathCopy.splice(0, 1);

            return internal(pathCopy, depth, cwd);
        } else {
            let cwdCopy = [...cwd];
            cwdCopy.push(path[0]);

            let pathCopy = [...path];
            pathCopy.splice(0, 1);

            return internal(pathCopy, depth + 1, cwdCopy);
        }
    }

    let newPath = internal(pathArray, 0, cwdPath).map((item) => {
        if (item === "") {
            return "/"
        } else {
            return item
        }
    })

    // validate a path on the filesystem
    function internal2(path: string[], depth: number, layer: any): boolean {
        let item = layer[path[depth]];

        if (item !== undefined) {
            if (path.length - 1 === depth && item[">type"] === "dir") {
                return true
            }

            return internal2(path, depth + 1, item);
        }


        return false;
    }

    let newSearchablePath = newPath.filter((item) => item !== "/");
    if (newPath.length > 0) newSearchablePath.splice(0, 0, "");

    let isValidPath = internal2(newSearchablePath, 0, fileSystem);
    if (!isValidPath) { tPrintln("bad file path"); return 1; }

    let textPath = "";

    newPath.forEach(item => {
        textPath += item;
    })

    currentWorkingDirectory.setValue(textPath);

    return 0;
}