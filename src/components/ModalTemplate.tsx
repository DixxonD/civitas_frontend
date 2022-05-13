import React, {useEffect, useState} from "react";
import { Modal } from '@mantine/core';

interface Prop {
    visible: boolean,
    title: string,
    onClose(): void,
    content: JSX.Element,
    fullSize?: boolean,
}

function ModalTemplate({visible, title, onClose, content, fullSize=false}:Prop){
    const [opened, setOpened] = useState<boolean>(false)

    useEffect(() => {
        setOpened(visible)
    }, [visible])


    return (
        <>
            <Modal
                {...(fullSize) ?  {size: '90%'}: {}}
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