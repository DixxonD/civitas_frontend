import React from "react";
import { showNotification, updateNotification } from '@mantine/notifications';
import {Check, X} from "tabler-icons-react";


export function showLoadingNotification(id: string, title: string, message: string){
    showNotification({
        id: id,
        title: title,
        message: message,
        loading: true,
        autoClose: false,
        disallowClose: true
    })
}

export function closeNotification(id: string, title="Done", message=""){
    updateNotification({
        id: id,
        autoClose: 0,
        title: title,
        message: message,
        icon: <Check size={20}/>,
        color: 'green',
    })
}

export function showErrorNotification(title = 'Sorry!', message =  'An Error occurred.'){
    showNotification({
        title: title,
        message: message,
        color: 'red',
        autoClose: false,
        icon: <X size={20}/>
    })
}


