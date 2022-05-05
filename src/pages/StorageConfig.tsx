import React, {useState} from "react";
import {Button, Stepper, Text, Title} from "@mantine/core";
import StepUnplugDevice from "../components/storageInitialization/StepUnplugDevice";
import AppStep from "../components/storageInitialization/AppStep";
import deviceInitialisationStrings from "../components/storageInitialization/deviceInitialisationStrings";
import {callAfterState, callBeforeState, registerDisk} from "../services/DeviceInitialisation";
import StepPlugDevice from "../components/storageInitialization/StepPlugDevice";
import {StorageDeviceDescription} from "../config/types";
import StepConfirmDevice from "../components/storageInitialization/StepConfirmDevice";
import StepComplete from "../components/storageInitialization/StepComplete";

function StorageConfig(){

    const [active, setActive] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedDeviceDescription, setSelectedDeviceDescription] = useState<StorageDeviceDescription>()

    function goToNextStep(){
        setActive(active => active + 1)
    }

    function onAbort(){
        setActive(1)
    }

    function afterUnplugDevice(){
        setIsLoading(true)
        callBeforeState().then(() => {
            setIsLoading(false)
            goToNextStep()
        })
    }

    function afterPlugInDevice(){
        setIsLoading(true)
        callAfterState().then(deviceDescription => {
            setIsLoading(false)
            setSelectedDeviceDescription(deviceDescription)
            goToNextStep()
        })
    }

    function afterDiskConfirmation(){
        setIsLoading(true)
        registerDisk().then( () => {
            setIsLoading(false)
            goToNextStep()
        })
    }



    return (
        <div className='content'>
            <Title >Add Storage Device</Title>
            <Stepper style={{margin: '10px', marginTop:'30px'}} active={active}  breakpoint='sm' >

                <Stepper.Step label="Start" description="">

                    <AppStep
                        title='Start'
                        onNext={goToNextStep}
                        isLoading={isLoading}
                    >
                        <Text>{deviceInitialisationStrings.welcomeText}</Text>
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
                    <StepComplete/>
                </Stepper.Completed>


            </Stepper>
        </div>

    )

}


export default StorageConfig

/*
  <Grid className='content' columns={6}>
            <Grid.Col span={1}>
                <InitializationProgress activeElement={1}/>
            </Grid.Col>
            <Grid.Col span={5}>Text</Grid.Col>
        </Grid>
 */

/*
          <InitializationProgress
              activeElement={1}
              steps={[
                  {
                      content: (<Text>Hi</Text>),
                      label: 'Test',
                      description: "A descripton"
                  },
                  {
                      content: (<Text>Hallo</Text>),
                      label: 'Test II',
                      description: "Another descripton"
                  },
              ]}
          />
 */