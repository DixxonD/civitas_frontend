
import React, {useState, useEffect} from 'react'
import {Dashboard} from '@uppy/react'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import {Text } from "@mantine/core";
import {useUploader} from "./UploadContext";


function Uploader(){
    const [progress, setProgress] = useState(0)
    const uppy = useUploader()

    useEffect(() => {
        //return () => {uppy.close()}
    }, [])

    uppy.on('files-added', (files) => {
        console.log(files)
    })

    uppy.on('complete', (result) => {
        // const url = result.successful[0].uploadURL
        console.log(result)
         //console.log("complete!", result.successful[0].uploadURL)
    })

    uppy.on("progress", (progress) => {
        setProgress(progress)
    })

    return (
        <div>
            <Dashboard
                uppy={uppy}
                width="100%"
                height="400px"
            />
            <Text size={"md"}>{progress}</Text>
        </div>
    )
}
export default  Uploader