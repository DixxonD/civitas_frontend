import React, {useState} from "react";
import {Divider, Menu, Text} from "@mantine/core";
import {Activity, PackgeImport, PlugConnected, Plus} from "tabler-icons-react";
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

    const [reconnectModalVisible, setReconnectModalVisible] = useState<boolean>(false)
    const [replaceModalVisible, setReplaceModalVisible] = useState<boolean>(false)
    const [addDiskModalVisible, setAddDiskModalVisible] = useState<boolean>(false)
    const [addPreparedDiskModalVisible, setPreparedDiskModalVisible] = useState<boolean>(false)

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
                    disabled={diskIsAlreadyConnected}
                >
                    Add empty storage
                </Menu.Item>

                <Menu.Item
                    icon={<PackgeImport size={18}/>}
                    onClick={() => setPreparedDiskModalVisible(true)}
                    disabled={diskIsAlreadyConnected}
                >
                    Use prepared disk
                </Menu.Item>

                <Divider />
                <Menu.Label>Maintain Disk</Menu.Label>

                <Menu.Item
                    icon={<PlugConnected size={18}/>}
                    disabled={!diskIsAlreadyConnected}
                >
                    Reconnect disk
                </Menu.Item>

                <Menu.Item
                    icon={<Activity size={18}/>}
                    disabled={!diskIsAlreadyConnected}
                >
                    Replace disk
                </Menu.Item>
            </Menu>
        </>
    )
}

export default SupplierNodeMenu