import React from "react";
import {Center, RingProgress, ThemeIcon, Text, Group, Paper, Title} from "@mantine/core";
import {Check, QuestionMark, X} from "tabler-icons-react";
import {RaidStatus} from "../../../config/types";

interface Prop{
    pool: RaidStatus
}

function StateIndicator({pool}:Prop){

    function renderState(pool: RaidStatus){
        if(!pool.state){
            return (
                <Group>
                    <CustomRingState color='orange' icon={<QuestionMark size={22}/>}/>
                    <UnknownDescription/>
                </Group>
            )
        }

        if(pool.state.toLocaleLowerCase() === 'online'){
            return (
                <Group>
                    <CustomRingState color='teal' icon={<Check size={22}/>}/>
                    <OkDescription/>
                </Group>
            )
        }

        return (
            <Group>
                <CustomRingState color='red' icon={<X size={22}/>}/>
                <ErrorDescription title={pool.state} link={pool.see}/>
            </Group>
        )
    }


    return (
        <div>

            <Paper style={{marginBottom: '5px'}}  shadow="xs" p='md' >
                <Title style={{marginLeft: '10px'}} order={4}>{pool.path}</Title>
                {renderState( pool )}
            </Paper>
        </div>
        )
}

interface StateProp{
    color: string,
    icon: JSX.Element
}

function CustomRingState({color, icon}: StateProp){
    return (<RingProgress
        sections={[{value: 100, color: color}]}
        label={
            <Center>
                <ThemeIcon color={color} variant='light' radius='xl' size='xl'>
                    {icon}
                </ThemeIcon>
            </Center>
        }
    />)
}


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

export default StateIndicator