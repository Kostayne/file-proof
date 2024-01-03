import { $, component$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import io from 'socket.io-client';
import type { NoSerialize} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

// c
import { Button } from "~/components/button";
import { FileInput } from "~/components/fileInput";
import { TextInput } from "~/components/textInput";
import { TransactionHash } from "~/components/transactionHash";
import { TransactionDetailsList } from "~/components/transactionDetailsList";

import { QLoader } from "~/integrations/react/loader";

// utils
import { fetchApi } from "~/utils/fetchApi";
import { backendUrl } from "~/cfg";

// models
import type { FileInfoModel } from "~/models/fileInfo.model";
import type { TransactionInfoModel } from "~/models/transactionInfo.model";
import { FileInfo } from "~/components/fileInfo";

export default component$(() => {
  const ownerName = useSignal('');
  const isTxLoading = useSignal(false);
  const transactionHash = useSignal('');
  const file = useSignal<NoSerialize<File | undefined>>();
  const fileInfo = useSignal<FileInfoModel | undefined | null>(undefined);
  const transactions = useStore<TransactionInfoModel[]>([]);

  const onFileChange = $((f: NoSerialize<File | undefined>) => {
    file.value = f;
  });

  useVisibleTask$(({ cleanup }) => {
    const socket = io(backendUrl);

    const onTransaction = (_: number, owner: string, fileHash: string, txHash: string) => {
      transactions.push({
        txHash,
        fileHash,
        owner,
      });
    };

    socket.on('tx', onTransaction);

    cleanup(() => {
      socket.off('tx', onTransaction);
      socket.close();
    });
  });

  const onSubmit = $(async () => {
    // validation
    if (ownerName.value === '') {
      alert('Enter a owner name!');
      return;
    }

    if (!file.value) {
      alert('Select a file!');
      return;
    }

    // api
    const fd = new FormData();
    fd.append('file', file.value);

    isTxLoading.value = true;

    const resp = await fetchApi(`submit?owner=${ownerName.value}`, {
      method: 'POST',
      body: fd,
    });

    isTxLoading.value = false;

    if (!resp.ok) {
      alert('Error happened');
      return;
    }

    const json = await resp.json();
    transactionHash.value = json.hash as string;

    // reset inputs
    file.value = undefined;
    ownerName.value = '';

    // reset file info resp
    fileInfo.value = undefined;
  });

  const onGet = $(async () => {
    // validation
    if (!file.value) {
      alert('Select a file!');
      return;
    }

    // api
    const fd = new FormData();
    fd.append('file', file.value);

    isTxLoading.value = true;

    const resp = await fetchApi(`get`, {
      method: 'POST',
      body: fd,
    });

    isTxLoading.value = false;

    if (!resp.ok) {
      alert('Error happened');
      return;
    }

    const respData: FileInfoModel = await resp.json();
    
    fileInfo.value = respData;

    if (respData[0] === 0 && respData[1] === '') {
      fileInfo.value = null;
    }

    transactionHash.value = '';
  });

  return (
    <main class="p-6">
      <h2>Upload a file</h2>

      <FileInput file={file.value} onChange={onFileChange} class='mx-auto mt-5' />

      <TextInput 
        class="mt-5 mx-auto" 
        value={ownerName.value} 
        onChange$={v => { ownerName.value = v; }} 
        label="Enter owner name"
      />

      <div class='mt-5 mx-auto w-fit flex gap-2'>
        <Button onClick$={onSubmit}>Submit</Button>
        <Button onClick$={onGet}>Get Info</Button>
      </div>

      {fileInfo.value === null && (
        <p class={[
          'p-3 rounded-md bg-blue-300 text-white mt-5',
          'max-w-[400px] mx-auto animate-fadein'
        ]}>File not found</p>
      )}

      {fileInfo.value && (
        <FileInfo info={fileInfo.value} class="mx-auto mt-5" />
      )}

      {isTxLoading.value && (
        <QLoader class="mt-8" />
      )}

      {transactionHash.value && (
        <TransactionHash class="mx-auto mt-5" hash={transactionHash.value} />
      )}

      <h2 class="mt-10">Live Transactions Mined</h2>
      <TransactionDetailsList details={transactions} class="mt-5" />
    </main>
  );
});

export const head: DocumentHead = {
  title: "File proof dApp",

  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
