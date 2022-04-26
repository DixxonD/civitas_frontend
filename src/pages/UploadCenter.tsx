import React, {useCallback, useState, ChangeEvent} from "react";
import { Text, Title,  Code } from '@mantine/core';
import {useTus} from "use-tus";
import {server} from "../config/config";
import UploadBox from "../components/UploadBox";
import UploadSection from "../components/UploadSection";
import Uploader from "../components/Uploader";


function UploadCenter(){

    return (
        <div>
            <Title order={1}>Upload Center</Title>
            <Uploader/>
        </div>
    )
}

export default UploadCenter