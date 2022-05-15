import React, {useEffect} from "react";
import {Center, Loader} from '@mantine/core';
import {getBuildProgress} from "../../../../services/DeviceAPI";
import {showErrorNotification} from "../../../../services/AppNotificationProvider";

interface Prop{
    onComplete(): void,
    onFailed() : void
}

function StepCreatingRAID({onComplete, onFailed}: Prop){


    useEffect(() => {
        const interval = setInterval(() => {
            getBuildProgress().then(progress => {
                if(progress.progress < 0){
                    clearInterval(interval)
                    showErrorNotification("RAID Failed", "The creation of the RAID failed. Please try again.")
                    onFailed()
                    return
                }
                if (progress.progress >= 100) {
                    clearInterval(interval)
                    onComplete()
                    return
                }
                if(!progress.building){
                    clearInterval(interval)
                    showErrorNotification("RAID creation did not start", "Perform the process again to create a RAID")
                    onFailed()
                }
            })
        }, 2000)

        return () => {
            clearInterval(interval)
        }

    }, [])
    return (
        <Center style={{margin: '20px'}}>
            <Loader size='xl' variant='bars' />
        </Center>
    )
}

export default StepCreatingRAID