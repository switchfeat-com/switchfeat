import { Dialog, Switch, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { classNames } from "../../helpers/classHelper";
import { FlagModel } from "../../models/FlagModel";
import * as dateHelper from "../../helpers/dateHelper";
import * as keys from "../../config/keys";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { CreateOrUpdateFlagDialog, CreateOrUpdateFlagDialogProps } from "./CreateOrUpdateFlagDialog";

export const FlagsItem: React.FC<{ flag: FlagModel, handleRefreshFlags: () => void }> = (props) => {
    const [enabled, setEnabled] = useState(false);
    const [pendingSwitchEnabled, setPendingSwitchEnabled] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const cancelButtonRef = useRef(null);

    const [openEdit, setOpenEdit] = useState(false);

    const editFlagProps: CreateOrUpdateFlagDialogProps = {
        open: openEdit,
        setOpen: setOpenEdit,
        onCancel: () => { setOpenEdit(false); },
        title: "Edit flag",
        description: "Update your feature flag.",
        refreshAll: props.handleRefreshFlags,
    };


    useEffect(() => {
        setEnabled(props.flag.status);
    }, [props.flag.status]);

    const confirmFlagUpdate = (): void => {
        const formData = new FormData();
        formData.append('flagKey', props.flag.key);
        formData.append('flagStatus', pendingSwitchEnabled.toString());

        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/flags/`, {
            method: "PUT",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "true"
            },
            body: formData
        }).then(async resp => {
            return resp.json();
        }).then(respJson => {
            if (respJson.success as boolean) {
                setEnabled(pendingSwitchEnabled);
                props.flag.status = pendingSwitchEnabled;
                setShowConfirmation(false);
            } else {
                let msg = "Generic error occurred, please try again.";
                if (respJson.errorCode === "error_input") {
                    msg = "One or more required information are missing.";
                } else if (respJson.errorCode === "error_alreadysaved") {
                    msg = "There is already a flag with the same name.";
                }
                console.log(msg);
            }
        }).catch(error => { console.log(error); });
    };

    const cancelFlagUpdate = (): void => {
        setShowConfirmation(false);
    };

    const showConfirmationDialog = (newStatus: boolean): void => {
        setPendingSwitchEnabled(newStatus);
        setShowConfirmation(true);
    };

    return (
        <>
            <div className="w-full hover:cursor-pointer" onClick={() => setOpenEdit(!openEdit)} >
                <div className="bg-white shadow sm:rounded-lg m-4">
                    <Switch.Group as="div" className="px-4 py-5 sm:p-6">

                        <div className=" sm:flex sm:items-start sm:justify-between">
                            <div className="max-w-xl text-base text-gray-500">
                                <div className="text-base  leading-6 text-gray-900">
                                    <span className="font-semibold">{props.flag.name}</span> <span> ({props.flag.description})</span>
                                </div>
                                <div className="mt-3 text-left">
                                    <code className="py-1 rounded-md text-sm">key: {props.flag.key}</code>


                                </div>
                            </div>
                            <div className=" sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                                <div className="flex flex-col">
                                    <div className="text-sm text-gray-500"> {dateHelper.formatDateTime(props.flag.createdOn)}</div>
                                    <div className="text-right">
                                        <Switch
                                            checked={enabled}
                                            onClick={(e) => e.stopPropagation()}
                                            onChange={(checked) => { showConfirmationDialog(checked); }}
                                            className={classNames(
                                                enabled ? 'bg-green-600' : 'bg-gray-200',
                                                'mt-3 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2',
                                                'border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2'
                                            )}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className={classNames(
                                                    enabled ? 'translate-x-5' : 'translate-x-0',
                                                    'inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                )}
                                            />
                                        </Switch>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Switch.Group>
                </div>
            </div>
            <CreateOrUpdateFlagDialog {...editFlagProps} flag={props.flag} />

            <Transition.Root show={showConfirmation} as={Fragment}>
                <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setShowConfirmation}>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <QuestionMarkCircleIcon className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Confirm flag update
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-base text-gray-500">
                                                        <span>Are you sure you want to</span> <span className="font-bold"> {`${pendingSwitchEnabled ? 'activate' : 'deactivate'}`}</span>  <span>this feature? Your changes will be immediately applied.</span>
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent
                                            bg-emerald-600 px-4 py-2 text-base font-medium text-white shadow-sm
                                            hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => { confirmFlagUpdate(); }}
                                        >
                                            Apply
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2
                                            text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2
                                            focus:ring-emerald-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => { cancelFlagUpdate(); }}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
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
