import React from "react";
import {Paper, Title} from "@mantine/core";

interface Prop{
    children: JSX.Element[] | JSX.Element,
    menu?: JSX.Element,
    title?: string
}

function SimpleBoxTemplate({title='', menu = <></>, children}: Prop) {

    return (
        <Paper style={{marginTop: '30px', marginBottom: '20px'}}  shadow="xs" p='md'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',width: '100%'}}>
                <Title order={3} style={{marginLeft:'10px', display: 'flex', justifyContent: 'flex-start', flex: 3}}>{title}</Title>
                <div style={{display: 'flex', justifyContent: 'flex-end', flex: 1}}>
                    {menu}
                </div>

            </div>
            {children}
        </Paper>
    )

}
export default SimpleBoxTemplate