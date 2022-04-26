import React from 'react'
import {Dashboard} from '@uppy/react'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import {useUploader} from "./UploadContext";


function Uploader(){
    const uppy = useUploader()

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