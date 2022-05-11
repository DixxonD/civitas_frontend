import {Button, Title, Paper, LoadingOverlay} from "@mantine/core";
import React, {useEffect, useState} from "react";


interface Prop {
    children: JSX.Element,
    title: string,
    buttonText?: string,
    buttonDisabled?: boolean,
    buttonLoading?: boolean,
    buttonHide?: boolean,
    isLoading: boolean,
    onNext(): void,
    abortButton?: JSX.Element
}

function AppStep({title,
                     children,
                     onNext,
                     isLoading,
                     abortButton=(<></>),
                     buttonText='Next Step',
                     buttonDisabled=false,
                     buttonLoading=false,
                     buttonHide=false
                }: Prop){

    const [showOverlay, setShowOverlay] = useState<boolean>(isLoading)
    useEffect(() => {setShowOverlay(isLoading)}, [isLoading])
    const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(buttonDisabled)
    useEffect(() => {setButtonIsDisabled(buttonDisabled)}, [buttonDisabled])
    const [buttonIsLoading, setButtonIsLoading] = useState<boolean>(buttonLoading)
    useEffect(() => {setButtonIsLoading(buttonLoading)}, [buttonLoading])

    return (
        <div  style={{marginTop: '30px', position:'relative'}} >
            <LoadingOverlay visible={showOverlay}/>
            <Paper  style={{marginBottom: '20px'}}  shadow="xs" p='md'>
                <Title order={3}>{title}</Title>
                {children}
            </Paper>
            {abortButton}
            {!buttonHide && <Button
                loading={buttonIsLoading}
                disabled={buttonIsDisabled}
                onClick={() => onNext()}
            >
                {buttonText}
            </Button>}

        </div>
    )

}

export default AppStep