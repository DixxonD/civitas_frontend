import React, {useCallback, useState, ChangeEvent} from "react";
import { Text, Title,  Code } from '@mantine/core';
import {useTus} from "use-tus";
import {server} from "../config/config";
import UploadBox from "../components/UploadBox";


function UploadCenter(){

    const {upload, setUpload} = useTus()

    const handleSetUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if(!event || !event.target || !event.target.files) return // null check
        const file = event.target.files.item(0)
        if(!file) return;
        setUpload(file, {
            endpoint: `${server.addr}:${server.port}/upload`,
            metadata: {
                filename: file.name,
                filetype: file.type
            }
        })
    }, [setUpload])


    const handleStart = useCallback(() => {
        if(!upload){
            return;
        }
        upload.start()
    }, [upload])

    return (
        <div>
            <Title order={1}>Upload Center</Title>
           {/* <input type="file" onChange={handleSetUpload}/>
            <button type="button" onClick={handleStart}>Upload</button>*/}
            <UploadBox/>
        </div>
    )
}

export default UploadCenter