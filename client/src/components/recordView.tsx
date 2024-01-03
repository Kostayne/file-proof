import { component$ } from "@builder.io/qwik";

interface RecordViewProps {
    class?: string;
    records: [name: string, value: string][];
}

export const RecordView = component$<RecordViewProps>((props) => {
    return (
        <div class={[
            props.class, 
            'flex flex-col gap-y-1 text-left',
            'p-4 rounded-md bg-blue-300 text-white',
            'max-w-[400px] break-words animate-fadein'
        ]}>
            {props.records.map(r => {
                return (
                    <div key={r[0] + r[1]}>
                        <span class="font-bold">{r[0]}: </span>
                        <span>{r[1]}</span>
                    </div>
                );
            })}
        </div>
    );
});