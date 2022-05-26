import React, {useEffect, useState} from "react";
import {useInterval} from "@mantine/hooks";
import {Group, Progress, Text} from "@mantine/core";
import {getRsyncProgress} from "../../services/DashboardAPI";
import {RsyncProgressState} from "../../config/types";
import SimpleBoxTemplate from "../SimpleBoxTemplate";

interface Prop{
    emptyIfNoSync: boolean
}

const SLOW_INTERVAL = 60000
const DEFAULT_INTERVAL = 20000
const FAST_INTERVAL = 2000

function SyncProgress({emptyIfNoSync}: Prop) {
    const [content, setContent] = useState<JSX.Element>(<></>)

    const defaultState = {running: false, progress: 0, job: null, remaining: 0, speed: 0}

    const interval_default = useInterval(() => fetchAndDisplaySyncProgress(), DEFAULT_INTERVAL)
    const interval_fast = useInterval(() => fetchAndDisplaySyncProgress(), FAST_INTERVAL)
    const interval_slow = useInterval(() => fetchAndDisplaySyncProgress(), SLOW_INTERVAL)

    const stopALlIntervals = () => {
        interval_default.stop()
        interval_fast.stop()
        interval_slow.stop()
    }

    useEffect(() => {
        fetchAndDisplaySyncProgress()
        interval_default.start()
        return stopALlIntervals
    }, [])

    function fetchAndDisplaySyncProgress(){
        getRsyncProgress()
            .then(state => {
                setContent(render(undefined, state))
                adjustInterval(false, state.running)
            }).catch((error) => {
                setContent(render(error.message, defaultState))
                adjustInterval(true, false)
            })
    }


    function adjustInterval(hasError:boolean, isInProgress: boolean){

        if(hasError){
            if(!interval_slow.active){
                stopALlIntervals()
                interval_slow.start()
            }
            return
        }

        if(isInProgress){
            if(!interval_fast.active){
               stopALlIntervals()
                interval_fast.start()
            }
            return;
        }

        if(!interval_default.active){
          stopALlIntervals()
            interval_default.start()
        }
    }

    function getProgress(syncState: RsyncProgressState): JSX.Element{
        return (
            <SimpleBoxTemplate
                maxWidth={780}
                title='Sync in Progress'
            >
                <Progress
                    style={{marginTop: 10}}
                    radius='lg'
                    size='xl'
                    value={syncState.progress}
                />
                <Group style={{marginTop: 10, marginLeft: 5}}>
                    <Text>Remaining time: {syncState.remaining} seconds</Text>
                    <Text>Speed: {syncState.speed} MB/s</Text>
                </Group>
            </SimpleBoxTemplate>
        )
    }

    function render(error: string|undefined, syncState: RsyncProgressState): JSX.Element{

        if(error && !emptyIfNoSync){
            return (
                <SimpleBoxTemplate maxWidth={780}>
                    <Text>Sync State is unknown: {error}</Text>
                </SimpleBoxTemplate>
            )
        }

        if(syncState.running){
            return getProgress(syncState)
        }

        if(emptyIfNoSync) {
            return <></>
        }

        return (
            <SimpleBoxTemplate maxWidth={780}>
                <Text>No Sync in Progress.</Text>
            </SimpleBoxTemplate>
        )
    }


    return (
        <>
            {content}
        </>
    )

}

export default SyncProgress