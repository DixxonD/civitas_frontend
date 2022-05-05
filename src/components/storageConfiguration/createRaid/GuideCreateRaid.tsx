import React, {useState} from "react";
import {Stepper, Text} from "@mantine/core";
import AppStep from "../AppStep";
import deviceInitialisationStrings from "../deviceInitialisationStrings";
import {getRegisteredDisks} from "../../../services/DeviceInitialisation";
import {StorageDeviceDescription} from "../../../config/types";
import StepDiskSelection from "./StepDiskSelection";

function GuideCreateRaid(){
    const [active, setActive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [registeredDisks, setRegisteredDisks] = useState<StorageDeviceDescription[]>([])


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
        })
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
                        onNext={goToNextStep}
                        isLoading={isLoading}
                        buttonText="Let's start"
                    >
                        <StepDiskSelection/>
                    </AppStep>

                </Stepper.Step>




            </Stepper>
        </div>
    )

}

export default GuideCreateRaid