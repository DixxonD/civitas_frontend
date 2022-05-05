import React, {useState} from "react";
import GuideAddingStorage from "../components/storageConfiguration/addingStorage/GuideAddingStorage";
import {Accordion, Title} from "@mantine/core";
import GuideCreateRaid from "../components/storageConfiguration/createRaid/GuideCreateRaid";

function StorageConfig(){

    return (
        <div className='content'>
            <Title order={1}>Storage Configurator</Title>
            <Accordion>
                <Accordion.Item label='Add Storage Device'>
                    <GuideAddingStorage/>
                </Accordion.Item>
                <Accordion.Item label='Create RAID'>
                    <GuideCreateRaid/>
                </Accordion.Item>

            </Accordion>

        </div>

    )
}


export default StorageConfig
