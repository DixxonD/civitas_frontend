import React from "react";
import { useForm } from "@mantine/form";
import {Button, Group, TextInput} from "@mantine/core";
import {DirectoryManipulation} from "../../../config/types";
import PathView from "./PathView";

interface Prop {
    onSubmit(values: DirectoryManipulation): void,
    onAbort(): void,
    label: string,
    placeholder: string,
    basePath: string
}

function FromAddDirectory({basePath, label, placeholder, onSubmit, onAbort}: Prop){
    const form = useForm({
        initialValues: {
            name: '',
            basePath: basePath
        },
        validate: {
             name: (value: string) =>  invalidChars.some(c => value.includes(c)) ? 'invalid input': null
        }
    });

    const invalidChars = ['/', '\0', '.']


    return (
        <div>
            <PathView title="Creates Folder in" basePath={basePath}/>
            <form onSubmit={form.onSubmit((values: DirectoryManipulation) => onSubmit(values))}
            >
                <TextInput
                    required
                    label={label}
                    placeholder={placeholder}

                    {...form.getInputProps('name')}
                />
                <Group position='right' mt='md'>
                    <Button onClick={onAbort} variant="outline">Cancel</Button>
                    <Button type='submit' >Create</Button>
                </Group>
            </form>
        </div>
    )
}

export default FromAddDirectory