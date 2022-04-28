import React from 'react'
import {Dashboard} from '@uppy/react'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import {useUploader} from "./UploadContext";
import {showNotification, updateNotification} from "@mantine/notifications";
import {Check} from "tabler-icons-react";


function Uploader(){
    const uppy = useUploader()

    uppy.on("upload", function(){
        showNotification({
            id: "upload",
            title: "Upload started",
            message: `The upload process was started`,
            icon: <Check size={20}/>,
            loading: true,
            disallowClose: true,
            autoClose: false,
            color: 'green',
            style: { backgroundColor: 'white' },
        })
    })

    uppy.on('complete', function (result){
        const numberFiles = result.successful.length
        if(numberFiles < 1){return}
        const fileStr = numberFiles === 1 ? 'file was ' : 'files were'
        updateNotification({
            id: "upload",
            title: "Upload complete",
            message: `${numberFiles} ${fileStr} successfully uploaded`,
            icon: <Check size={20}/>,
            loading: false,
            disallowClose: true,
            autoClose: 4000,
            color: 'green',
            style: { backgroundColor: 'white' },
        })
    })

    return (
        <div>
            <Dashboard
                uppy={uppy}
                width="100%"
                height="400px"
            />
        </div>
    )
}
export default  Uploader