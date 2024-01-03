import type { QwikChangeEvent} from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";

interface TextInputProps {
    class?: string;
    label?: string;
    value: string;

    onChange$?: (val: string) => void;
}

export const TextInput = component$<TextInputProps>((props) => {
    const onChange = $((e: QwikChangeEvent<HTMLInputElement>) => {
        if (props.onChange$) {
            props.onChange$(e.target.value);
        }
    });

    const Input = (
        <input 
            class={[
                'border border-gray-300 rounded-md',
                'p-[3px]'
            ]} 

            onChange$={onChange} 
            value={props.value} 
        />
    );

    return (
        <div class={[props.class, 'max-w-[300px]']}>
            {props.label && (
                <label class="flex flex-col gap-y-[10px]">
                    <span class="text-left">{props.label}</span>
                    {Input}
                </label>
            )}

            {!props.label && (
                <>
                    {Input}
                </>
            )}
        </div>
    );
});