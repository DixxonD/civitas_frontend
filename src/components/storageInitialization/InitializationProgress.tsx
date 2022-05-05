import React, {useState, useEffect} from "react";
import {Stepper} from "@mantine/core";

export interface Step{
    content: JSX.Element,
    label: string,
    description: string
}

interface Prop{
    activeElement: number,
    steps: Step[]
}

function InitializationProgress({activeElement, steps}: Prop){
    const [active, setActive] = useState<number>(activeElement)
    const [content, setContent] = useState<JSX.Element[]>(renderSteps())

    useEffect(() => {setActive(activeElement)}, [activeElement])
    useEffect(() => {
        setContent(renderSteps())
    }, [steps])

    function renderSteps(){
        return steps.map(step => (
            <Stepper.Step label={step.label} description={step.description}>
                {step.content}
            </Stepper.Step>
        ))
    }


    return (
        <Stepper active={active} onStepClick={setActive} breakpoint='sm' >
            {content}
        </Stepper>
    )
}

export default InitializationProgress

