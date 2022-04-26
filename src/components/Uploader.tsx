

import React, {useState, useEffect} from 'react'
import {Uppy, UppyFile} from '@uppy/core'
//import Uppy = require('@uppy/core')
//import Tus = require('@uppy/tus')
import Tus from '@uppy/tus'
import {Dashboard, DashboardModal, DragDrop, ProgressBar, useUppy} from '@uppy/react'

import {tus, server} from '../config/config'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import {Title, Text } from "@mantine/core";






function Uploader(){
    const [progress, setProgress] = useState(0)
    const [uppy, setUppy] = useState(() => {
        return new Uppy({
            autoProceed: true
        }).use(Tus, { endpoint: `${server.addr}:${server.port}${tus.endpoint}` })
    })

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