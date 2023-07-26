import { Transition, Dialog } from "@headlessui/react";
import { KeyIcon } from "@heroicons/react/24/outline";
import { ElementRef, FC, Fragment, useRef, useState } from "react";
import { toast } from 'react-hot-toast';
import { UseApiKeysProps } from "./hooks";

export const CreateApiKey: FC<{hookState: UseApiKeysProps}> = (props) => {
    const [open, setOpen] = useState(false);
    const nameRef = useRef<ElementRef<"input">>(null);
    const [keyGenerated, setKeyGenerated] = useState<string | null>("");

    const handleGenerateApiKey = async () => {

        if (!nameRef.current) {
            return;
        }

        const apiKey = await props.hookState.generateApiKey(nameRef.current.value);

        if (apiKey) {
            setKeyGenerated(apiKey);
        } else {
            toast.error("Error creating API Key, please try again.");
            setOpen(false);
        }
    };

    const handleGeneratedKeyOnClose = () => {
        setOpen(false);
        setKeyGenerated(null);
        props.hookState.doRefreshSdkAuths();
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="block rounded-md bg-emerald-600 px-3 py-2.5 text-center text-base font-semibold text-white 
                                shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
                Create API Key
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={handleGeneratedKeyOnClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white 
                                px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <KeyIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg text-center font-semibold leading-6 text-gray-900 mb-5">
                                                Create API Key
                                            </Dialog.Title>

                                            {!keyGenerated ? (
                                                <>
                                                    <label>Key name</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Your key name"
                                                        ref={nameRef}
                                                        className=" w-full rounded-md border-0 py-2.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                                             placeholder:text-gray-400 focus:ring-2 focus:ring-inset mt-2
                                                             focus:ring-emerald-600 sm:text-base sm:leading-6"
                                                    />
                                                </>

                                            ) : (
                                                <div className="mt-2 text-center text-lg">
                                                    <p>Please save your new API key somewhere safe. For security reasons,
                                                        <strong className="font-semibold text-gray-900"> you won&apos;t be able to see it again</strong>.
                                                        If you lose this secret key, you&apos;ll need to generate a new one.</p>
                                                    <div className="mt-4" >
                                                        <code>{keyGenerated}</code>

                                                    </div>

                                                </div>
                                            )}

                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        {!keyGenerated ? (
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-emerald-600 
                                            px-3 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                                onClick={handleGenerateApiKey}
                                            >
                                                Create API Key
                                            </button>

                                        ) : (
                                            <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-emerald-600 
                                            px-3 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-emerald-500 
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                                onClick={handleGeneratedKeyOnClose}
                                            >
                                                Done
                                            </button>
                                        )}

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
