import { component$ } from "@builder.io/qwik";

// models
import type { TransactionInfoModel } from "~/models/transactionInfo.model";

// c
import { TransactionDetails } from "./transactionDetails";

interface TransactionDetailsListProps {
    class?: string;
    details: TransactionInfoModel[];
}

export const TransactionDetailsList = component$<TransactionDetailsListProps>((props) => {
    const res: JSX.Element[] = [];

    // inverse loop a bit more performant that creating a new reversed array
    // new transactions will appear on the top
    for (let i = props.details.length - 1; i > -1; i--) {
        const t = props.details[i];

        res.push((
            <TransactionDetails class="mx-auto w-full" details={t} key={t.txHash} />
        ));
    }

    return (
        <div class={[props.class, 'flex flex-col gap-3']}>
            {props.details.length === 0 && (
                <span class="block">No transactions found</span>
            )}

            {props.details.length > 0 && <>{res}</>}
        </div>
    );
});