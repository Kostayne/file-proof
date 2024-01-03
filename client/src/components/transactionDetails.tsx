import { component$ } from "@builder.io/qwik";

// c
import { RecordView } from "./recordView";

// models
import type { TransactionInfoModel } from "~/models/transactionInfo.model";

interface TransactionDetailsProps {
    details: TransactionInfoModel;
    class?: string;
}

export const TransactionDetails = component$<TransactionDetailsProps>((props) => {
    const { class: className } = props;
    const { txHash, fileHash, owner } = props.details;

    return (
        <RecordView class={className} records={[
            ['Owner', owner],
            ['File hash', fileHash],
            ['Transaction hash', txHash]
        ]} />
    );
});