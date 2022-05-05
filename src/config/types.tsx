export type FileDescription = {
    name: string,
    type: "directory" | "file",
    contents?: FileDescription[]
}
export interface DirectoryManipulation {
    name: string,
    basePath: string
}

export interface SimpleAxiosError{
    response: {data: string}
}

export interface StorageDeviceDescription{
    id: string,
    size: string,
    name: string,
    mountPoint: string
}