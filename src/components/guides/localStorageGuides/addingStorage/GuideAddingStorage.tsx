import React, {useState} from "react";
import {StorageDeviceDescription} from "../../../../config/types";
import {callAfterState, callBeforeState, registerDisk} from "../../../../services/DeviceAPI";
import {Button, Stepper, Text} from "@mantine/core";
import AppStep from "../AppStep";
import deviceInitialisationStrings from "../deviceInitialisationStrings";
import StepUnplugDevice from "./StepUnplugDevice";
import StepPlugDevice from "./StepPlugDevice";
import StepConfirmDevice from "./StepConfirmDevice";
import StepComplete from "../StepComplete";
import {showErrorNotification} from "../../../../services/AppNotificationProvider";

const START_STEP = 0
const PREPARE_STEP = 1

interface Prop{
    onLastStep?: Function
}

function GuideAddingStorage({onLastStep}: Prop){

    const [active, setActive] = useState<number>(START_STEP)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedDeviceDescription, setSelectedDeviceDescription] = useState<StorageDeviceDescription>()

    function goToNextStep(){
        setActive(active => active + 1)
    }

    function goToStart(){
        setActive(START_STEP)
    }

    function onAbort(){
        setActive(PREPARE_STEP)
    }

    function afterUnplugDevice(){
        setIsLoading(true)
        callBeforeState().then(() => {
            setIsLoading(false)
            goToNextStep()
        }).catch(error => {
            setIsLoading(false)
            showErrorNotification('Sorry!', error.message)
        })
    }

    function afterPlugInDevice(){
        setIsLoading(true)
        callAfterState().then(deviceDescription => {
            setIsLoading(false)
            setSelectedDeviceDescription(deviceDescription)
            goToNextStep()
        }).catch(error => {
            setIsLoading(false)
            showErrorNotification('Sorry!', error.message)
            onAbort()
        })
    }

    function afterDiskConfirmation(){
        if(selectedDeviceDescription){
            setIsLoading(true)
            registerDisk(selectedDeviceDescription).then( () => {
                setIsLoading(false)
                if(onLastStep){onLastStep(); return}
                goToNextStep()
            }).catch((error) => {
                setIsLoading(false)
                showErrorNotification('Sorry!', error.message)
                onAbort()
            })
        }else{
            showErrorNotification()
        }

    }

    return (
        <div >
            <Stepper style={{margin: '10px', marginTop:'30px'}} active={active}  breakpoint='sm' >

                <Stepper.Step label="Start" description="">

                    <AppStep
                        title='Start'
                        onNext={goToNextStep}
                        isLoading={isLoading}
                        buttonText="Let's start"
                    >
                        <Text>{deviceInitialisationStrings.welcomeTextAddStorage}</Text>
                    </AppStep>

                </Stepper.Step>
                <Stepper.Step label="Prepare" description="Unplug storage device">

                    <AppStep
                        title='Unplug your storage device'
                        onNext={afterUnplugDevice}
                        isLoading={isLoading}
                    >
                        <StepUnplugDevice/>
                    </AppStep>

                </Stepper.Step>
                <Stepper.Step label="Plug in" description="Plug in your storage device">

                    <AppStep
                        title='Plugin your storage device'
                        onNext={afterPlugInDevice}
                        isLoading={isLoading}
                    >
                        <StepPlugDevice/>
                    </AppStep>

                </Stepper.Step>

                <Stepper.Step label="Confirm" description="Confirm your storage device">

                    <AppStep
                        title='Confirm your selection'
                        onNext={afterDiskConfirmation}
                        isLoading={isLoading}
                        buttonText={"Add Storage Device"}
                        abortButton={(
                            <Button
                                style={{marginRight: '10px'}}
                                variant='outline'
                                color='red'
                                onClick={() => onAbort()}
                            >Restart device detecting</Button>
                        )}
                    >
                        <StepConfirmDevice deviceDescription={selectedDeviceDescription}/>
                    </AppStep>

                </Stepper.Step>
                <Stepper.Completed>
                    <AppStep
                        title=""
                        isLoading={isLoading}
                        onNext={goToStart}
                        buttonText={"Add another device"}
                    >
                        <StepComplete/>
                    </AppStep>
                </Stepper.Completed>


            </Stepper>
        </div>

    )

}

export default GuideAddingStorage