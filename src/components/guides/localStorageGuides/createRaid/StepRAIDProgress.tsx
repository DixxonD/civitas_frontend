import React, {useEffect, useState} from "react";
import {Progress} from "@mantine/core";
import {getBuildProgress} from "../../../../services/DeviceAPI";

interface Prop{
    onComplete(): void
}

function StepRAIDProgress({onComplete}:Prop){

    let intervalObj: NodeJS.Timer
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        if(progress === 100){
            if(intervalObj){
                clearInterval(intervalObj)
            }
            onComplete()
        }
    }, [progress])

    useEffect(() => {
        intervalObj = setInterval(() => {
            getBuildProgress().then(progress => {
                console.log(progress)
                setProgress(progress.progress)
            })
        }, 1000)

        return () => {
            if(intervalObj){
                clearInterval(intervalObj)
            }
        }
    }, [])

    return (
        <>
            <Progress value={progress} />
        </>

    )
}

export default StepRAIDProgress