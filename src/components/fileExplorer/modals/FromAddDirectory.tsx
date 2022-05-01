import React from "react";
import { useForm } from "@mantine/form";
import {Button, Group, TextInput} from "@mantine/core";
import {FormValuesAddFile} from "../../../config/types";
import PathView from "./PathView";

interface Prop {
    onSubmit(values: FormValuesAddFile): void,
    label: string,
    placeholder: string,
    basePath: string
}

function FromAddDirectory({basePath, label, placeholder, onSubmit}: Prop){
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
            <form onSubmit={form.onSubmit((values: FormValuesAddFile) => onSubmit(values))}
            >
                <TextInput
                    required
                    label={label}
                    placeholder={placeholder}

                    {...form.getInputProps('name')}
                />
                <Group position='right' mt='md'>
                    <Button type='submit' >Create</Button>
                </Group>
            </form>
        </div>
    )
}

export default FromAddDirectory