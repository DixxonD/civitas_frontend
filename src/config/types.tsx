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

export interface Disk{
    name: string,
    state: string,
    read: number,
    write: number,
    checksum: number
}

export interface RaidStatus{
    exists: boolean,
    path: string | undefined,
    state: string | undefined,
    see: string | undefined,
    free: number | undefined,
    size: number | undefined,
    disks: Disk[]

}

export interface Node{
    nodeID: string,
    ip: string,
    name: string | undefined
}

export interface StorageSupplier {
    nodeID: string,
    name: string | undefined,
    disk: string | undefined,
    lastSeen: Date | null
}

export interface StorageProvider {
    nodeID: string,
    name: string | undefined,
    ip: string,
    frequency: number,
    lastBackup: Date,
    missedHeartbeats: number
}

export interface ObjWithNodeName{
    nodeID: string,
    name: string | undefined
}