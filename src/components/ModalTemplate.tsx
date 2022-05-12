import React, {useEffect, useState} from "react";
import { Modal } from '@mantine/core';

interface Prop {
    visible: boolean,
    title: string,
    onClose(): void,
    content: JSX.Element
}

function ModalTemplate({visible, title, onClose, content}:Prop){
    const [opened, setOpened] = useState<boolean>(false)

    useEffect(() => {
        setOpened(visible)
    }, [visible])


    return (
        <>
            <Modal
                opened={opened}
                onClose={onClose}
                title={title}
                centered
            >
                {content}
            </Modal>
        </>
    )

}

export default ModalTemplate