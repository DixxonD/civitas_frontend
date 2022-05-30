import React, {useEffect, useState} from "react";
import {Divider, Menu, Text} from "@mantine/core";
import {PackgeImport, Plus} from "tabler-icons-react";
import ModalTemplate from "../../ModalTemplate";
import GuideProvideEmptyDisk from "../../guides/remoteStorageGuides/provideDisk/GuideProvideEmptyDisk";
import GuideProvidePreparedDisk from "../../guides/remoteStorageGuides/provideDisk/GuideProvidePreparedDisk";

interface Prop{
    button: JSX.Element,
    statusIcon: JSX.Element,
    statusText: string,
    diskIsAlreadyConnected: boolean,
    supplierNodeID: string,
    afterAction(): void,
}

function SupplierNodeMenu({button, statusIcon, statusText, diskIsAlreadyConnected, supplierNodeID, afterAction}: Prop) {

    const [addDiskModalVisible, setAddDiskModalVisible] = useState<boolean>(false)
    const [addPreparedDiskModalVisible, setPreparedDiskModalVisible] = useState<boolean>(false)
    const [diskIsConnected, setDiskIsConnected] = useState<boolean>(diskIsAlreadyConnected)
    useEffect(() => {setDiskIsConnected(diskIsAlreadyConnected)}, [diskIsAlreadyConnected])

    return (
        <>
            <ModalTemplate
                fullSize
                visible={addDiskModalVisible}
                title='Provide a disk for a friend'
                onClose={() => setAddDiskModalVisible(false)}
                content={
                <GuideProvideEmptyDisk
                    supplierNodeId={supplierNodeID}
                    onFinish={() => {
                            setAddDiskModalVisible(false)
                            afterAction()
                        }
                    }
                />}
            />

            <ModalTemplate
                visible={addPreparedDiskModalVisible}
                title='Provide a prepared disk for a friend'
                onClose={() => setPreparedDiskModalVisible(false)}
                content={(
                    <GuideProvidePreparedDisk
                        onFinish={() => {
                            setPreparedDiskModalVisible(false)
                            afterAction()
                        }}
                    />
                )}
            />

            <Menu size='lg' control={button}>
                <Menu.Item
                    component={Text}
                    icon={statusIcon}
                    disabled
                >
                    {statusText}
                </Menu.Item>
                <Divider />
                <Menu.Label>Provide Disk</Menu.Label>

                <Menu.Item
                    icon={<Plus size={18}/>}
                    onClick={() => setAddDiskModalVisible(true)}
                    disabled={diskIsConnected}
                >
                    Add empty storage
                </Menu.Item>

                <Menu.Item
                    icon={<PackgeImport size={18}/>}
                    onClick={() => setPreparedDiskModalVisible(true)}
                    disabled={diskIsConnected}
                >
                    Use prepared disk
                </Menu.Item>

            </Menu>
        </>
    )
}

export default SupplierNodeMenu