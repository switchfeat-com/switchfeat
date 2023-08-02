import { Transition, Dialog } from "@headlessui/react";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FC, Fragment, useState } from "react";
import { UseApiKeysProps } from "./hooks";
import { toast } from "react-hot-toast";

export const DeleteApiKey: FC<{
    sdkAuthKey: string;
    hookState: UseApiKeysProps;
}> = (props) => {
    const [open, setOpen] = useState(false);

    const handleDeleteApiKey = async () => {
        const success = await props.hookState.deleteApiKey(props.sdkAuthKey);

        if (success) {
            toast.success("API Key successfully deleted.");
            props.hookState.doRefreshSdkAuths();
        } else {
            toast.error("Error deleting API Key, please try again.");
        }

        setOpen(false);
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                type="button"
                className="inline-flex items-center rounded-md bg-white px-2.5 
                py-1.5 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
            >
                <TrashIcon className="h-6 w-6 text-red-600" />
            </button>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setOpen}>
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
                                <Dialog.Panel
                                    className="relative transform overflow-hidden rounded-lg bg-white 
                                px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                                >
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                            <XMarkIcon
                                                className="h-6 w-6 text-red-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <div className="mt-3 sm:mt-5 text-lg">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg text-center font-semibold leading-6 text-gray-900 mb-5"
                                            >
                                                Delete API Key
                                            </Dialog.Title>
                                            <p>
                                                This API key will immediately be
                                                disabled. API requests made
                                                using this key will be rejected,
                                                which could break any
                                                functionality depending on it.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-600 
                                            px-3 py-2.5 text-base font-semibold text-white shadow-sm hover:bg-red-500 
                                            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                            onClick={handleDeleteApiKey}
                                        >
                                            Confirm
                                        </button>
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
