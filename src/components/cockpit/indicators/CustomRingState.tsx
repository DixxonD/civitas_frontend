import React, {useState} from "react";
import {Center, RingProgress, ThemeIcon, Tooltip} from "@mantine/core";

interface StateProp{
    color: string,
    tooltipContent: JSX.Element,
    icon: JSX.Element,
    size?: number,
    tooltipDisabled?: boolean,
    colorOnHover?: string,
    onClick?: Function
}

function CustomRingState({color, colorOnHover, icon, tooltipContent, size=150, tooltipDisabled=false, onClick= () => {}}: StateProp){

    const [showTooltip, setShowTooltip] = useState<boolean>(false)
    const [dynamicColor, setDynamicColor] = useState<string>(color)

    return (
        <Tooltip
            opened={showTooltip}
            label={tooltipContent}
            withArrow
            color={color}
        >
            <RingProgress
                onMouseEnter={() => setShowTooltip((!tooltipDisabled))}
                onMouseLeave={() => setShowTooltip(false)}
                size={size}
                thickness={(size/10)}
                sections={[{value: 100, color: color}]}
                label={
                    <Center
                        onMouseEnter={() => setDynamicColor(colorOnHover?  colorOnHover : color)}
                        onMouseLeave={() => setDynamicColor(color)}
                        onClick={() => onClick()}
                        style={{cursor: 'pointer'}}>
                        <ThemeIcon color={dynamicColor} variant='light' radius={(size/2.5)} size={(size/2.5)}>
                            {icon}
                        </ThemeIcon>
                    </Center>
                }
            />
        </Tooltip>)
}

export default CustomRingState