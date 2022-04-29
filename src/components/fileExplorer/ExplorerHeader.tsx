import React, {CSSProperties, useEffect, useState} from "react";
import {BsFillCaretLeftFill} from 'react-icons/bs'
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Badge} from '@mantine/core';

import {FiRefreshCw} from 'react-icons/fi'

interface Prop {
    showBackButton: boolean,
    path: string[],
    onBack(): void,
    onClick(indexOfElement: number): void,
    onRefresh(): void

}

function ExplorerHeader({onBack, onClick, onRefresh, showBackButton, path}: Prop){

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

    const badgeStyle = {
        marginRight: '5px',
        cursor: 'pointer',

    }

    return (
        <>

            <div style={{display: "flex", flexDirection: 'row', alignItems: 'center'}}>
                <BackButton onBack={onBack} disabled={!showBack}/>
                <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                    <FiRefreshCw  onClick={onRefresh} size='1.8em' style={{cursor: 'pointer'}} />
                </div>
            </div>

            <div
                style={{ display: 'flex', alignItems: 'center'}}
            >
                <Breadcrumb
                    style={{display: 'flex', marginLeft: '15px', alignItems: 'center', alignContent: 'center'}}
                >
                    {breadcrumbItems}
                </Breadcrumb>
            </div>
            <Badge style={badgeStyle} onClick={() => {}} color="gray" variant='filled'>
                Add File
            </Badge>
            <Badge style={badgeStyle} onClick={() => {}} color="gray" variant='filled'>
                Add Subdirectory
            </Badge>

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
        {display: 'flex', flexDirection: 'row', alignItems: 'center' }
        :
        {display: 'flex', flexDirection: 'row', alignItems: 'center', cursor: 'pointer'}

    const color: string = isDisabled ? 'gray' : 'black'

    const onClick = isDisabled ? () => {} : onBack

    return (
        <div
            onClick={onClick}
            style={style}
        >
            <BsFillCaretLeftFill color={color} size={'1em'}/>
            <div color={color} >Back</div>
        </div>
    )
}
export default ExplorerHeader