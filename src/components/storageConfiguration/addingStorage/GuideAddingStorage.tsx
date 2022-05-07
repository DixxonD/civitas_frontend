import React, {useState} from "react";
import {StorageDeviceDescription} from "../../../config/types";
import {callAfterState, callBeforeState, registerDisk} from "../../../services/DeviceInitialisation";
import {Button, Stepper, Text} from "@mantine/core";
import AppStep from "../AppStep";
import deviceInitialisationStrings from "../deviceInitialisationStrings";
import StepUnplugDevice from "./StepUnplugDevice";
import StepPlugDevice from "./StepPlugDevice";
import StepConfirmDevice from "./StepConfirmDevice";
import StepComplete from "../StepComplete";
import {showErrorNotification} from "../../../services/AppNotificationProvider";

function GuideAddingStorage(){

    const [active, setActive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedDeviceDescription, setSelectedDeviceDescription] = useState<StorageDeviceDescription>()

    function goToNextStep(){
        setActive(active => active + 1)
    }

    function goToStart(){
        setActive(0)
    }

    function onAbort(){
        setActive(1)
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
            console.log("hiii!¨")
            console.log(deviceDescription)
            setSelectedDeviceDescription(deviceDescription)
            goToNextStep()
        }).catch(error => {
            setIsLoading(false)
            showErrorNotification('Sorry!', error.message)
        })
    }

    function afterDiskConfirmation(){
        if(selectedDeviceDescription){
            setIsLoading(true)
            registerDisk(selectedDeviceDescription).then( () => {
                setIsLoading(false)
                goToNextStep()
            }).catch((error) => {
                setIsLoading(false)
                showErrorNotification('Sorry!', error.message)
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