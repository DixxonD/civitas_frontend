import React, {useCallback, useState, ChangeEvent} from "react";
import { Text, Title,  Code } from '@mantine/core';
import Uploader from "../components/upload/Uploader";


function UploadCenter(){

    return (
        <div>
            <Title order={1}>Upload Center</Title>
            <Uploader/>
        </div>
    )
}

export default UploadCenter