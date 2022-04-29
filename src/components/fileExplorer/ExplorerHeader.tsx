import React, {CSSProperties, MouseEventHandler, useEffect, useState} from "react";
import {BsFillCaretLeftFill} from 'react-icons/bs'
import {Text} from '@mantine/core';
import Breadcrumb from "react-bootstrap/Breadcrumb";


interface Prop {
    showBackButton: boolean,
    path: string[],
    onBack(): void,
    onClick(indexOfElement: number): void,

}

function ExplorerHeader({onBack, onClick, showBackButton, path}: Prop){

    const [showBack, setShowBack] = useState<boolean>(showBackButton)
    const [breadcrumbItems, setBreadcrumbItems] = useState<JSX.Element[]>(() => renderBreadcrumbElements(path))

    useEffect(() => {
        setBreadcrumbItems(() => renderBreadcrumbElements(getPathList(path)))
    }, [path])

    useEffect(() => {
        setShowBack(showBackButton)
    }, [showBackButton])


    function renderBreadcrumbElements(pathElements: string[])  {
        const lastElement = pathElements.length - 1
        return pathElements.map((item, index) =>{
            const isLastElement = lastElement===index
            return (
                <Breadcrumb.Item
                    active={isLastElement}
                    key={index}
                    onClick={isLastElement ? () => {} : () => onClick(index)}
                >
                        {item}
                </Breadcrumb.Item>
        )})
    }

    function getPathList(path: string[]): string[]{
        return ['root', ...path]
    }

    return (
        <>

            <div style={{display: "flex", flexDirection: 'row'}}>
                 <BackButton onBack={onBack} disabled={!showBack}/>
                <Breadcrumb style={
                    {marginLeft: '20px'}
                }>{breadcrumbItems}</Breadcrumb>
            </div>
        </>
    )
}



interface PropBackButton {
    disabled: boolean,
    onBack(): void
}

const  BackButton = ({onBack, disabled}: PropBackButton) => {

    const [isDisabled, setIsDisabled] = useState<boolean>(disabled)

    useEffect(() => {
        setIsDisabled(disabled)
    }, [disabled])

    const style: CSSProperties = isDisabled ?
        {display: 'flex', flexDirection: 'row', }
        :
        {display: 'flex', flexDirection: 'row', cursor: 'pointer'}

    const color: string = isDisabled ? 'gray' : 'black'

    const onClick = isDisabled ? () => {} : onBack

    return (
        <div
            onClick={onClick}
            style={style}
        >
            <BsFillCaretLeftFill color={color} size={'1em'}/>
            <Text color={color} >Back</Text>
        </div>
    )
}
export default ExplorerHeader