import { Slot, component$ } from "@builder.io/qwik";

interface ButtonProps {
    class?: string;
    onClick$?: () => void;
}

export const Button = component$<ButtonProps>((props) => {
    return (
        <button
            onClick$={() => props.onClick$?.call({})}
            class={[
                props.class, 'px-[15px] py-[10px]',
                'bg-blue-400 rounded-[3px] text-white',
                'hover:bg-blue-500 transition'
            ]}
        >
            <Slot />
        </button>
    );
});