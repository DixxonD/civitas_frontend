import React, {useContext, useState} from "react";
import {Uppy} from "@uppy/core";
import Tus from "@uppy/tus";
import {server, tus} from "../../config/config";
import FileTargetPlugin from "./FileTargetPlugin";

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
            autoProceed: false
        })
            .use(FileTargetPlugin, {})
            .use(Tus, { endpoint: `${server.addr}:${server.port}${tus.endpoint}` })
            //.use(GoldenRetriever, {serviceWorker: false})
    })

    return (
        <UploadContext.Provider value={uppy}>
            {children}
        </UploadContext.Provider>
    )

}