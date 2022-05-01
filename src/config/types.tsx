export type FileDescription = {
    type: string,
    name: "directory" | "file",
    contents?: FileDescription[]
}
export interface FormValuesAddFile{
    name: string,
    basePath: string
}
