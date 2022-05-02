export type FileDescription = {
    type: string,
    name: "directory" | "file",
    contents?: FileDescription[]
}
export interface DirectoryManipulation {
    name: string,
    basePath: string
}

export interface SimpleAxiosError{
    response: {data: string}
}