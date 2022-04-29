import React, {useEffect, useState} from "react";
import { Text, Modal } from '@mantine/core';

interface Prop {
    visible: boolean,
    basePath: string[],
    dirName: string
}

function ModalAddDirectory({visible, basePath, dirName}:Prop){
    const [opened, setOpened] = useState<boolean>(false)

    useEffect(() => {
        setOpened(visible)
    }, [visible])

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title={"Add Folder"}
                centered
            >
                <Text>{`${basePath.toString()}/${dirName}`}</Text>
            </Modal>
        </>
    )

}

export default ModalAddDirectory