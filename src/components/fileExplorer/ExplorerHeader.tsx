import React, {useEffect, useState} from "react";
import {BsFillCaretLeftFill} from 'react-icons/bs'
import {Text, Anchor, Breadcrumbs, Space} from '@mantine/core';


interface Prop {
    showBackButton: boolean,
    path: string[],
    onBack(): void,
    onClick(indexOfElement: number): void,

}

function ExplorerHeader({onBack, onClick, showBackButton, path}: Prop){

    const [showBack, setShowBack] = useState<boolean>(showBackButton)
    const [elements, setElements] = useState<JSX.Element[]>( () => renderPathElements(path))

    useEffect(() => {
        setElements(() => renderPathElements(getPathList(path)))
    }, [path])

    useEffect(() => {
        setShowBack(showBackButton)
    }, [showBackButton])



    function renderPathElements(pathElements: string[]){
        return pathElements.map((item, index) => (
            <Anchor href='#' key={index}>
                <div onClick={() => onClick(index)}>
                {item}
                </div>
            </Anchor>
        ))
    }

    function getPathList(path: string[]): string[]{
        return ['root', ...path]
    }

    return (
        <div style={{display: "flex", flexDirection: 'row'}}>
            { showBack && <BackButton onBack={onBack}/>}
            <Breadcrumbs style={{marginLeft: '15px'}}>{elements}</Breadcrumbs>
        </div>
    )
}

interface PropBackButton {
    onBack(): void
}

const  BackButton = ({onBack}: PropBackButton) => (
    <div
        onClick={onBack}
        style={{display: 'flex', flexDirection: 'row', cursor: 'pointer'}}
    >
        <BsFillCaretLeftFill  size={'1em'}/>
        <Text>Back</Text>
    </div>
)

export default ExplorerHeader