interface InformationRegistry {
    [key: string]: () => string;
}

interface CommandRegistry {
    [key: string]: (args: string[]) => Promise<number>;
}

interface CommandUnit {
    exec: ((args: string[]) => Promise<number>),
    args: string[]
}

interface MFileSystem {
    [key: string]: any;
}

interface MItem {
    name: string
    type: "file" | "dir"
}

interface MFile extends MItem {
    type: "file"

    content: string
    extension: string
}

interface MDirectory extends MItem {
    type: "dir"

    contains: MItem[]
}