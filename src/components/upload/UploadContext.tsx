import React, {useContext, useState} from "react";
import {Uppy} from "@uppy/core";
import Tus from "@uppy/tus";
import {server, tus} from "../../config/config";

const UploadContext = React.createContext(new Uppy())

export function useUploader(){
    return useContext(UploadContext)
}

type Props = {
    children: JSX.Element
}

export function UploadProvider({children}: Props){

    const [uppy, setUppy] = useState(() => {
        return new Uppy({
            autoProceed: true
        }).use(Tus, { endpoint: `${server.addr}:${server.port}${tus.endpoint}` })
    })

    return (
        <UploadContext.Provider value={uppy}>
            {children}
        </UploadContext.Provider>
    )

}