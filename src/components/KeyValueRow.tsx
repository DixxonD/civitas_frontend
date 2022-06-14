import React from "react";
import {Text, Group} from "@mantine/core";

interface Prop{
    description: string,
    value: string,
    delimiter?: string
}

/**
 * Reusable component to display two values separated by a delimiter.
 */
function KeyValueRow({description, value, delimiter=''}: Prop){
    return (
        <Group position='left'>
            <Text>{description}{delimiter}</Text>
            <Text weight={700}>{value}</Text>
        </Group>
    )
}

export default KeyValueRow;