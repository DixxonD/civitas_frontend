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

export interface BuildProgress{
    building: boolean,
    progress: number,
    path: string | null
}

export interface RaidStatus{
    exists: boolean,
    path: string | undefined,
    state: string | undefined,
    see: string | undefined,
    free: number | undefined,
    size: number | undefined

}