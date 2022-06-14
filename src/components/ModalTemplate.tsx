import React, {useEffect, useState} from "react";
import { Modal } from '@mantine/core';

interface Prop {
    visible: boolean,
    title: string,
    onClose(): void,
    content: JSX.Element,
    fullSize?: boolean,
}

/**
 * Reusable component to display a modal
 * @param visible opens/closes the modal
 * @param title Title of the modal, displayed at the top in normal font size.
 * @param onClose Function when closing the modal
 * @param content Content of the modal
 * @param fullSize Displays modal in largest possible size
 */
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