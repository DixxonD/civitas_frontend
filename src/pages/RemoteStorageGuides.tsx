import { Title } from "@mantine/core";
import React from "react";
import GuideAddRemoteStorage from "../components/guides/remoteStorageGuides/addRemoteNode/GuideAddRemoteStorage";

/**
 * Page for Guide to add remote storage
 */
function RemoteStorageGuides(){

    return (
        <div className='content'>
            <Title order={1}>Add remote storage</Title>
            <GuideAddRemoteStorage/>
        </div>)
}

export default RemoteStorageGuides