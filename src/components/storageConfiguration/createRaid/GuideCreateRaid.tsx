import React, {useState} from "react";
import {Button, Stepper, Text} from "@mantine/core";
import AppStep from "../AppStep";
import deviceInitialisationStrings from "../deviceInitialisationStrings";
import {buildRaid, getRegisteredDisks} from "../../../services/DeviceInitialisation";
import {StorageDeviceDescription} from "../../../config/types";
import StepDiskSelection from "./StepDiskSelection";
import {showErrorNotification} from "../../../services/AppNotificationProvider";
import StepComplete from "../StepComplete";
import StepCreatingRAID from "./StepCreatingRAID";

const START_STEP = 0

function GuideCreateRaid(){

    const [active, setActive] = useState<number>(START_STEP)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [registeredDisks, setRegisteredDisks] = useState<StorageDeviceDescription[]>([])
    const [selectedDisks, setSelectedDisks] = useState<string[]>([])
    const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true)



    function goToNextStep(){
        setActive(active => active + 1)
    }

    function goToStart(){
        setActive(START_STEP)
    }


    function afterStart(){
        setIsLoading(true)
        getRegisteredDisks().then(disks => {
            setRegisteredDisks(removeDuplicates(disks, disk => disk.id))
            setIsLoading(false)
            goToNextStep()
        }).catch(error => {
            setIsLoading(false)
            showErrorNotification('Sorry!', error.message)
            goToStart()
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
            goToStart()
        })
    }

    function removeDuplicates<T>(list: T[], key: (element: T) => any){
        return [...new Map(list.map(x => [key(x), x])).values()]
    }

    function onDiskSelectionUpdate(diskIDs: string[]){
        setSelectedDisks(diskIDs)
        setButtonIsDisabled(diskIDs.length !== 2)
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
                        title='Select Disks'
                        onNext={afterDiskSelection}
                        isLoading={isLoading}
                        buttonDisabled={buttonIsDisabled}
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

                <Stepper.Step label="RAID" description="Creating the RAID">
                    <AppStep
                        title={'RAID is being created'}
                        isLoading={isLoading}
                        onNext={goToNextStep}
                        buttonLoading={true}
                        buttonText='Finish'
                    >
                        <StepCreatingRAID onComplete={goToNextStep} onFailed={goToStart}/>
                    </AppStep>

                </Stepper.Step>

                <Stepper.Completed>
                    <AppStep
                        title=""
                        isLoading={isLoading}
                        onNext={goToStart}
                        buttonText="Create new RAID"
                    >
                        <StepComplete/>
                    </AppStep>
                </Stepper.Completed>


            </Stepper>
        </div>
    )

}

export default GuideCreateRaid