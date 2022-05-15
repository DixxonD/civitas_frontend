import React, {useState} from "react";
import { Stepper, Text, Button } from "@mantine/core";
import AppStep from "../localStorageGuides/AppStep";
import {Node} from "../../../config/types";
import deviceInitialisationStrings from "../localStorageGuides/deviceInitialisationStrings";
import StepSearchNodes from "./StepSearchNodes";
import StepSelectNode from "./StepSelectNode";
import {useNavigate} from "react-router-dom";
import StepComplete from "../localStorageGuides/StepComplete";
const START_STEP = 0
const SEARCH_STEP = 1
const SELECT_STEP = 2
const ALL_DONE_STEP = 3

function GuideAddRemoteStorage() {

    const [active, setActive] = useState<number>(START_STEP)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [nodes, setNodes] = useState<Node[]>([])
    const navigate = useNavigate()


    function goToNextStep(){
        setActive(active => active + 1)
    }

    function goToSearch(){
        setActive(SEARCH_STEP)
    }

    function onNodesFound(nodes: Node[]){
        setNodes(nodes)
        setActive(SELECT_STEP)
    }

    function onSelectNode(node: Node){
        //todo: call backend and claim node
        setActive(ALL_DONE_STEP)
    }

    function onFinish(){
        navigate('/')
    }

    return (
        <Stepper style={{margin: '10px', marginTop:'30px'}} active={active}  breakpoint='sm'>
            <Stepper.Step label='Start'>
                <AppStep
                    title='Start'
                    onNext={goToNextStep}
                    isLoading={isLoading}
                    buttonText="Search for nodes"
                >
                    <Text>{deviceInitialisationStrings.welcomeTextAddRemoteStorage}</Text>
                </AppStep>
            </Stepper.Step>

            <Stepper.Step label='Search Nodes'>
                <AppStep
                    title='Search for available nodes...'
                    isLoading={isLoading}
                    onNext={goToNextStep}
                    buttonHide
                >
                    <StepSearchNodes onFound={onNodesFound}/>
                </AppStep>
            </Stepper.Step>

            <Stepper.Step label='Select Node'>
                <AppStep
                    title='Select a Node'
                    isLoading={isLoading}
                    onNext={goToSearch}
                    buttonHide={nodes.length !== 0}
                    buttonText='Search again'
                    abortButton={nodes.length === 0 ? (
                        <Button
                            style={{marginRight: '10px'}}
                            variant='outline'
                            onClick={() => onFinish()}
                        >Cancel</Button>
                    ) : <></>}
                >
                    <StepSelectNode availableNodes={nodes} onSelect={onSelectNode}/>
                </AppStep>
            </Stepper.Step>

            <Stepper.Completed>
                <AppStep
                    title=''
                    isLoading={isLoading}
                    onNext={() => onFinish()}
                    buttonText='Finish'
                >
                    <StepComplete/>
                </AppStep>
            </Stepper.Completed>


        </Stepper>
    )
}

export default GuideAddRemoteStorage