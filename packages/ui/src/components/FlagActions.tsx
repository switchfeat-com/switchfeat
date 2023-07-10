import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { classNames } from "../helpers/classHelper";
import { ConfirmationDialog, ConfirmationDialogProps } from "./shared/ConfirmationDialog";
import * as keys from "../config/keys";
import { FlagModel } from "../models/FlagModel";
import { CreateOrUpdateFlagDialog, CreateOrUpdateFlagDialogProps } from "./shared/CreateOrUpdateFlagDialog";

export const FlagActions: React.FC<{ flag: FlagModel, refreshFlags: () => void  }> = (props) => {

    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const onConfirmDelete = () => {

        const formData = new FormData();
        formData.append('flagKey', props.flag.key);

        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/flags/`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "true"
            },
            body: formData
        }).then(resp => {
            return resp.json();
        }).then(respJson => {

            if (respJson.success) {
                setShowDelete(false);
                props.refreshFlags();
            }

        }).catch(error => { console.log(error) });
    };


    const deleteFlagProps: ConfirmationDialogProps = {
        show: showDelete,
        setShow: setShowDelete,
        onConfirm: onConfirmDelete,
        onCancel: () => setShowDelete(false),
        title: "Confirm flag delete",
        description: <>
            <span>Are you sure you want to </span>
            <span className="font-bold">delete</span><span> this flag?</span>
            <div className="py-3"><code className="bg-slate-100 px-2 py-1 rounded-md text-sm">{props.flag.key}</code></div>
            <div>Any subsequent API call will return with a <code>NotFound (404)</code> error.</div>
        </>,
        icon: <QuestionMarkCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />,
        accent: "red"
    };

    const editFlagProps: CreateOrUpdateFlagDialogProps = {
        open: showEdit,
        setOpen: setShowEdit,
        onCancel: () => setShowEdit(false),
        title: "Edit flag",
        description: "Update your feature flag.",
        flag: props.flag,
        refreshFlags: props.refreshFlags
    };


    return (
        <>
            <Menu as="div" className="relative flex-none">
                <Menu.Button className="  -mr-2    text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>

                            {({ active }) => (
                                <button
                                    onClick={() => setShowEdit(true)}
                                    className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left'
                                    )}
                                >
                                    Edit Flag
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => setShowDelete(true)}
                                    className={classNames(
                                        active ? 'bg-gray-50' : '',
                                        'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left'
                                    )}
                                >
                                    Delete Flag
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
            <ConfirmationDialog  {...deleteFlagProps} />
            <CreateOrUpdateFlagDialog  {...editFlagProps} />
        </>
    );
}