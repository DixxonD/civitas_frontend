import React, {useEffect, useState} from "react";
import { Text, Modal } from '@mantine/core';

interface Prop {
    visible: boolean,
    basePath: string[],
    dirName: string
}

function ModalUploadFiles({visible, basePath, dirName}:Prop){
    const [opened, setOpened] = useState<boolean>(false)

    useEffect(() => {
        setOpened(visible)
    }, [visible])

    return (
        <>

        </>
    )

}

export default ModalUploadFiles