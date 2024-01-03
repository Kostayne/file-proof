import { component$ } from "@builder.io/qwik";

interface TransactionHashProps {
    hash: string;
    class?: string;
}

export const TransactionHash = component$<TransactionHashProps>(({ hash, class: className }) => {
    return (
        <div class={[
            className,
            'bg-blue-300 text-white font-medium',
            'p-4 text-left rounded-md max-w-[400px]',
            'animate-fadein'
        ]}>
            <span class="font-bold">Hash:</span>
            <span class="break-words block">{hash}</span>
        </div>
    );
});