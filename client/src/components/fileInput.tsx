import type { QwikChangeEvent , NoSerialize } from "@builder.io/qwik";
import { component$, useSignal, $, noSerialize } from "@builder.io/qwik";
import { Button } from "./button";

interface FileInputProps {
    class?: string;
    file?: NoSerialize<File | undefined>;
    onChange?: (val: NoSerialize<File | undefined>) => void;
}

export const FileInput = component$<FileInputProps>((props) => {
    const inputRef = useSignal<HTMLInputElement>();

    const onBtnClick = $(() => {
        if (!inputRef.value) {
            return;
        }

        inputRef.value.click();
    });

    const onFileSelect = $((e: QwikChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            props.onChange?.call({}, noSerialize(e.target.files[0]));
            
            // fix of an html bug (can't select the same file)
            e.target.value = '';
            return;
        }

        props.onChange?.call({}, noSerialize(undefined));
    });

    return (
        <label class={[
            'flex items-center pl-[10px] h-[35px] overflow-hidden max-w-[300px]', 
            'rounded-md border-gray-200 border cursor-pointer',
            props.class
        ]}>
            <span>{props.file?.name || 'Choose a file...'}</span>
            <Button class='h-full ml-auto border-none px-[15px]' onClick$={onBtnClick}>Select</Button>
            <input ref={inputRef} class="hidden" onChange$={onFileSelect} type="file" placeholder="Choose file.." />
        </label>
    );
});