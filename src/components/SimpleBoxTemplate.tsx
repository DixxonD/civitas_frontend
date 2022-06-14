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

/**
 * Reusable component to represent a box with shading.
 * @param title Title to be displayed at the top
 * @param menu React component which is displayed at the top right
 * @param onClick Function when clicking on the box
 * @param hovering Change the appearance when the mouse moves over the box, default is false.
 * @param maxWidth Maximum width of the box
 * @param titleSize Size of the title, default is font size 3
 * @param customTitle Instead of a string title, a React component can be defined
 * @param children Content of the box
 */
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