import { Box } from "./utils";


export const inputBuffer = new Box<string[]>([]); // array of chars (strings that contain one letter)

export const commandOutput = new Box<string>("");

export const hostname = new Box<string>("mimja@computer");
export const currentWorkingDirectory = new Box<string>("/root");
export const commandHistory = new Box<string[]>([]);