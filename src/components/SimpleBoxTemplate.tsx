import React from "react";
import {Group, Paper, Title, TitleOrder} from "@mantine/core";

interface Prop{
    children: JSX.Element[] | JSX.Element,
    menu?: JSX.Element,
    title?: string | JSX.Element,
    onClick?: Function,
    hovering?: boolean,
    maxWidth?: string | number,
    titleSize?: TitleOrder,
    customTitle?: JSX.Element,
}

function SimpleBoxTemplate({title='', menu = <></>, onClick = () => {}, hovering=false, maxWidth='', titleSize=3, customTitle, children}: Prop) {

    return (
        <Paper
            sx={theme => ({
                marginTop: '30px',
                marginBottom: '20px',
                maxWidth: maxWidth,
                cursor: hovering? 'pointer' : 'default',
                '&:hover': hovering? {backgroundColor: theme.colors.gray[1]} : {}
            })}
            onClick={() => onClick()}
            shadow="xs"
            p='md'>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start',width: '100%'}}>
                <Group>{customTitle}</Group>
                <Title order={titleSize} style={{marginLeft:'10px', display: 'flex', justifyContent: 'flex-start', flex: 3}}>{title}</Title>
                <div style={{display: 'flex', justifyContent: 'flex-end', flex: 1}}>
                    {menu}
                </div>

            </div>
            {children}
        </Paper>
    )

}
export default SimpleBoxTemplate