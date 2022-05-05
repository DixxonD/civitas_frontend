import {Button, Title, Paper, LoadingOverlay} from "@mantine/core";
import React, {useEffect, useState} from "react";


interface Prop {
    children: JSX.Element,
    title: string,
    isLoading: boolean,
    onNext(): void,
    abortButton?: JSX.Element
}

function AppStep({title, children, onNext, isLoading, abortButton=(<></>) }: Prop){

    const [showOverlay, setShowOverlay] = useState<boolean>(isLoading)
    useEffect(() => {setShowOverlay(isLoading)}, [isLoading])


    return (
        <div  style={{marginTop: '30px', position:'relative'}} >
            <LoadingOverlay visible={showOverlay}/>
            <Paper  style={{marginBottom: '20px'}}  shadow="xs" p='md'>
                <Title order={3}>{title}</Title>
                {children}
            </Paper>

            {abortButton}
            <Button onClick={() => onNext()}>Next Step</Button>

        </div>
    )

}

export default AppStep