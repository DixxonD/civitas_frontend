import React, {useEffect, useState} from "react";
import {useForm, useMediaQuery} from "@mantine/hooks";
import {Text, TextInput, Group, Anchor, Button, Popover, ActionIcon} from "@mantine/core";
import SimpleBoxTemplate from "../../SimpleBoxTemplate";
import {Edit} from "tabler-icons-react";
import {Node} from "../../../config/types"
import {showErrorNotification} from "../../../services/AppNotificationProvider";
import {updateNodeInformation} from "../../../services/NodeAPI";
import NodeNameText from "./NodeNameText";

interface Prop{
    ownNode: Node
}

function NodeName({ownNode}:Prop){
    const [node, setNode] = useState<Node>(ownNode)
    const [opened, setOpened] = useState(false)

    useEffect(() => {setNode(ownNode)}, [ownNode])

    function updateNodeName(newName: string){
        const newNode = {nodeID: node.nodeID, nodeName: newName, ip: node.ip}
        updateNodeInformation(newNode).then(() => {
            setNode(newNode)
        }).catch((error) => {
            showErrorNotification('Sorry!', error.message)
        })

    }


    return(
        <SimpleBoxTemplate
            customTitle={(
                <>
                    <Text>Your Node:</Text>
                    <NodeNameText node={node}/>
                </>)}
            maxWidth={780}
            menu={(
                <Popover
                    opened={opened}
                    onClose={() => setOpened(false)}
                    position='bottom'
                    placement='end'
                    withCloseButton
                    title='Edit node name'
                    transition='pop-top-right'
                    target={
                        <ActionIcon onClick={() => setOpened(isOpen => !isOpen)}>
                            <Edit size={24}/>
                        </ActionIcon>
                    }
                >
                    <NodeNameForm
                        nodeName={node.nodeName? node.nodeName : node.nodeID}
                        onChange={(values) =>{
                            updateNodeName(values.nodeName)
                            setOpened(false)
                        }}
                        onCancel={() => setOpened(false)}
                    />
                </Popover>
            )}

        >
            {}
        </SimpleBoxTemplate>

    )
}

interface FormProp{
    nodeName: string,
    onChange(values: {nodeName: string}): void,
    onCancel(): void
}


function NodeNameForm({nodeName, onChange, onCancel}: FormProp) {

    const isMobile = useMediaQuery('(max-width: 780px')
    const form = useForm({
        initialValues: {nodeName: nodeName},
        validationRules: {nodeName: (value) => value.trim().length > 2}
    })




    return (
        <form onSubmit={form.onSubmit(onChange)}>
            <TextInput
                required
                label='Node name'
                placeholder='node name'
                style={{minWidth: isMobile ? 220 : 300}}
                value={form.values.nodeName}
                onChange={(event) => form.setFieldValue('nodeName', event.currentTarget.value)}
                error={form.errors.nodeName}
                variant='default'
            />

            <Group position="apart" style={{marginTop: 15}}>
                <Anchor component='button' color='gray' size='sm' onClick={onCancel}>Cancel</Anchor>
                <Button type='submit' size='sm'>Save</Button>
            </Group>

        </form>
    )
}

export default NodeName