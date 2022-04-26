import React, {Component, Fragment, useEffect, useState} from "react";
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import {tus, server} from '../config/config'
import {Dashboard, DragDrop, ProgressBar, StatusBar} from "@uppy/react";



class UploadSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasFiles: false
        };

        this.uppy = new Uppy({
            id: "uppy1",
            autoProceed: false,
            restrictions: {maxNumberOfFiles: 4},
            allowMultipleUploadBatches: true
        })
            //.use(Tus, {endpoint:  `${server.addr}:${server.port}${tus.endpoint}`})

        //this.uppy.use(Tus, {endpoint:  `${server.addr}:${server.port}${tus.endpoint}`})
    }

    componentDidMount() {

        this.uppy
            .on("file-added", (file) => {
               console.log("file added!", file.name)
               // console.log(this.uppy.getFiles())
               // console.log(`${server.addr}:${server.port}${tus.endpoint}`)

            })
            .on("upload", (data) => {
                console.log("Starting upload...", data.id, "for files", data.fileIDs)
            } )
            .on("files-added", () => {
                console.log("fileS added")

                console.log("Status: ", this.uppy.getState())
                this.uppy.upload().then(result => {
                    console.log(result)
                })


            })
            .on("upload-success", (file, success) => {
                console.log(file.name, "has finished", success.status)
            })
            .on("complete", (result)=> {
                console.log("All Uploads complete!")
                console.log(result)
               // this.uppy.reset()
               // this.uppy.upload().then(result => console.log(result))

            })

    }
    componentWillUnmount() {
        this.uppy.close()
    }

    render() {
        const {contentID} = this.props
        console.log("hideUploadButton = ", !contentID)

        return (
            <Fragment>
                <StatusBar uppy={this.uppy}/>
                <Dashboard
                    uppy={this.uppy}
                    plugins={['Tus']}
                    proudlyDisplayPoweredByUppy={false}
                    showProgressDetails={true}
                    hideUploadButton={false}
                    style={{backgroundColor: "blue"}}
                    target="body"/>
                <style>
                    {`.uppy-Dashboard-inner { z-index: 0 !important}`}
                </style>
                <DragDrop
                    uppy={this.uppy}
                    allowMultipleFiles={true}
                    style={{backgroundColor: 'blue'}}

                >HI</DragDrop>
                <ProgressBar uppy={this.uppy}


                />
            </Fragment>
        )
    }
}

/*
const UploadSection = () => {

    const {uppy, setUppy} = useState()

    useEffect( () => {
        const u = new Uppy({
            meta: {type: 'avatar'},
            restrictions: {maxNumberOfFiles: 5},
            autoProceed: false
        })

        setUppy(u)
        console.log(`${server.addr}:${server.port}${tus.endpoint}`)
        u.use(Tus, {endpoint: `${server.addr}:${server.port}${tus.endpoint}`})
        u.on('complete', (result) =>{
            const url = result.successful[0].uploadURL
            console.log("complete", url)
        } )

        return () => u.close()

    }, [])





    return (
        <div>
        <DragDrop
            uppy={uppy}
            locale={{
                strings: {
                    // Text to show on the droppable area.
                    // `%{browse}` is replaced with a link that opens the system file selection dialog.
                    dropHereOr: 'Drop here or %{browse}',
                    // Used as the label for the link that opens the system file selection dialog.
                    browse: 'browse',
                },
            }}/>
        </div>
    )
}

 */

export default UploadSection