export type FileDescription = {
    type: string,
    name: "directory" | "file",
    contents?: FileDescription[]
}