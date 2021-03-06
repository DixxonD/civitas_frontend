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
    nodeName: string | undefined
}

export interface StorageSupplier {
    nodeID: string,
    nodeName: string | undefined,
    disk: string | undefined,
    lastSeen: Date | null
}

export interface StorageProvider {
    nodeID: string,
    nodeName: string | undefined,
    ip: string,
    frequency: number,
    lastBackup: Date,
    missedHeartbeats: number,
    hasDisk: boolean
}

export interface ObjWithNodeName{
    nodeID: string,
    nodeName: string | undefined
}
export interface StringMap{
    [key: string]: string
}

export interface PreparedDisk{
    poolName: string,
    state: string,
    action: string,
    hasSupplier: boolean
}

export interface RsyncProgressState{
    running: boolean,
    job: string | null,
    progress: number, // percentage
    speed: number, // in mb/s
    remaining: number // in seconds

}