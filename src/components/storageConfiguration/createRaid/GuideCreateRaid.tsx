import React, {useState} from "react";
import {Button, Stepper, Text} from "@mantine/core";
import AppStep from "../AppStep";
import deviceInitialisationStrings from "../deviceInitialisationStrings";
import {buildRaid, getRegisteredDisks} from "../../../services/DeviceInitialisation";
import {StorageDeviceDescription} from "../../../config/types";
import StepDiskSelection from "./StepDiskSelection";
import {showErrorNotification} from "../../../services/AppNotificationProvider";

function GuideCreateRaid(){
    const [active, setActive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [registeredDisks, setRegisteredDisks] = useState<StorageDeviceDescription[]>([])
    const [selectedDisks, setSelectedDisks] = useState<string[]>([])


    function goToNextStep(){
        setActive(active => active + 1)
    }

    function goToStart(){
        setActive(0)
    }

    function onAbort(){
        setActive(1)
    }

    function afterStart(){
        setIsLoading(true)
        getRegisteredDisks().then(disks => {
            setRegisteredDisks(disks)
            setIsLoading(false)
            goToNextStep()
        }).catch(error => {
            setIsLoading(false)
            showErrorNotification('Sorry!', error.message)
        })
    }

    function afterDiskSelection(){
        if(selectedDisks.length !== 2){
            showErrorNotification("Selection Error", "Please select two Storage Devices.")
            return
        }
        setIsLoading(true)
        buildRaid(selectedDisks).then(() => {
            setIsLoading(false)
            goToNextStep()
        }).catch(error => {
            setIsLoading(false)
            showErrorNotification('Sorry!', error.message)
        })
    }

    function onDiskSelectionUpdate(diskIDs: string[]){
        setSelectedDisks(diskIDs)
    }

    return (
        <div>
            <Stepper style={{margin: '10px', marginTop:'30px'}} active={active}  breakpoint='sm' >


                <Stepper.Step label="Start" description="">

                    <AppStep
                        title='Start'
                        onNext={afterStart}
                        isLoading={isLoading}
                        buttonText="Let's start"
                    >
                        <Text>{deviceInitialisationStrings.welcomeTextCreateRAID}</Text>
                    </AppStep>

                </Stepper.Step>

                <Stepper.Step label="Registered Devices" description="Select devices to mirror">

                    <AppStep
                        title='Start'
                        onNext={afterDiskSelection}
                        isLoading={isLoading}
                        abortButton={(
                            <Button
                                style={{marginRight: '10px'}}
                                variant='outline'
                                onClick={() => goToStart()}
                            >Cancel</Button>
                        )}
                    >
                        <StepDiskSelection
                            onSelectionUpdate={onDiskSelectionUpdate}
                            registeredDisks={registeredDisks}
                        />
                    </AppStep>

                </Stepper.Step>




            </Stepper>
        </div>
    )

}

export default GuideCreateRaid