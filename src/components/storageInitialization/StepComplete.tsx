import React from "react";
import {Check} from "tabler-icons-react";
import {Center,Text, Paper, Space} from "@mantine/core";


function StepComplete(){
    return (
        <div>
        <Paper style={{marginBottom: '20px'}}  shadow="xs" p='md'>
            <Center>
                <Check size={60} color='teal'/>
                <Space w='md'/>
                <Text  size='md' weight='500'>All Done. Congratulations! </Text>
            </Center>
        </Paper>
        </div>
    )
}

export default StepComplete