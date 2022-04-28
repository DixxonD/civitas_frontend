import React, {useState} from 'react'
import {Title} from '@mantine/core';
import ReactDOM from 'react-dom'
import {useUploader} from "../components/upload/UploadContext";
import {DashboardModal} from "@uppy/react";

// @ts-ignore
import FileBrowser from "react-keyed-file-browser"
import Explorer from "../components/fileExplorer/Explorer";
import ExplorerAccordion from "../components/fileExplorer/ExplorerAccordion";
import ExplorerBreadcrumbs from "../components/fileExplorer/ExplorerBreadcrumbs";

function Files(){
    const [showModal, setShowModal] = useState(false)

    const files = JSON.parse('[{"type":"file","name":"emptyFile1"},{"type":"directory","name":"subfolder","contents":[{"type":"file","name":"emptyFile2"},{"type":"directory","name":"subsubfolder","contents":[{"type":"file","name":"emptyFile3"},{"type":"file","name":"emptyFile4"}]}]}]')

    const uppy = useUploader()
    return (
        <div>
            <Title order={1}>Files</Title>
            <DashboardModal
                uppy={uppy}
                open={showModal}
                disabled={false}
                hideUploadButton={true}
            />
            <Explorer files={files}/>
            <ExplorerAccordion files={files}/>
            <ExplorerBreadcrumbs files={files}/>
        </div>
    )
}

export default Files