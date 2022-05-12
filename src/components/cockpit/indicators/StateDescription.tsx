import React from "react";
import {Text} from "@mantine/core";
import {RaidStatus} from "../../../config/types";

interface Prop{
    pool: RaidStatus
}

function StateDescription({pool}: Prop){


    function renderState(pool: RaidStatus){
        if(!pool.state){
            return (<UnknownDescription/>)
        }

        if(pool.state.toLocaleLowerCase() === 'online'){
            return (<OkDescription/>)
        }

        return (<ErrorDescription title={pool.state} link={pool.see}/>)
    }

    return renderState(pool)

}

export default StateDescription



interface ErrorProp{
    title: string,
    link: string | undefined
}

function ErrorDescription({title, link}: ErrorProp){
    return (
        <div>
            <Text weight={700}>{title}</Text>
            {link ? (<div>
                    <Text>The exact error description can be found here:</Text>
                    <Text><a href={link} target='_blank' rel='noopener noreferrer'>{link}</a></Text>
                </div>
            ):  <Text>Unfortunately, no further info can be provided.</Text>
            }
        </div>
    )
}

function OkDescription(){
    return (<div>
        <Text weight={700}>Online</Text>
        <Text>Everything is ok!</Text>
    </div>)
}

function UnknownDescription(){
    return (
        <div>
            <Text weight={700}>State unknown</Text>
            <Text>Sorry, the exact state of the pool is unknown</Text>
        </div>
    )
}
