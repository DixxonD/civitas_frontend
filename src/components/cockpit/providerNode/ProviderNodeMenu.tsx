import React, {useState} from "react";
import {Menu} from "@mantine/core";
import {CloudDownload} from "tabler-icons-react";
import ModalTemplate from "../../ModalTemplate";
import FormRestoreBackup from "../modals/FormRestoreBackup";

function ProviderNodeMenu(){

    const [restoreBackupVisible, setRestoreBackupVisible] = useState<boolean>(false)

    return(
        <>

            <ModalTemplate
                visible={restoreBackupVisible}
                title='Restore Backup'
                onClose={() => setRestoreBackupVisible(false)}
                content={
                <FormRestoreBackup
                    close={() => setRestoreBackupVisible(false)}
                />}
            />
            <Menu>
                <Menu.Item
                    icon={<CloudDownload size={18}/>}
                    onClick={() => setRestoreBackupVisible(true)}
                >
                    Restore Backup
                </Menu.Item>
            </Menu>


        </>
    )
}

export default ProviderNodeMenu