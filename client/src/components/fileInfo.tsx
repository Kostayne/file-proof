import { component$ } from "@builder.io/qwik";

// models
import type { FileInfoModel } from "~/models/fileInfo.model";

// c
import { RecordView } from "./recordView";

interface FileInfoProps {
    class?: string;
    info: FileInfoModel;
}

export const FileInfo = component$<FileInfoProps>((props) => {
    const { info } = props;

    return (
        <RecordView class={props.class} records={[
            ['Owner', info[1]],
            ['Timestamp', info[0].toString()]
        ]} />
    );
});