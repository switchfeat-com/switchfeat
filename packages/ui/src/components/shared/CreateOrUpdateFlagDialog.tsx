import { Transition, Dialog, Switch } from "@headlessui/react";
import { XMarkIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import * as keys from "../../config/keys";
import { FlagModel } from "../../models/FlagModel";
import { classNames } from "../../helpers/classHelper";

export interface CreateOrUpdateFlagDialogProps   {
    open: boolean;
    setOpen: (state: boolean) => void;
    onCancel: () => void;
    title: string;
    description: ReactNode;
    flag?: FlagModel;
    refreshFlags: () => void
};

 
export const CreateOrUpdateFlagDialog: React.FC<CreateOrUpdateFlagDialogProps> = (props) => {

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const [enabled, setEnabled] = useState(false); 

    useEffect (() => { 

        if (!props.flag || !props.open) {
            return;
        } 
      
        setEnabled(props.flag?.status);

    },[props.flag, props.open]);



    const handleCreateFlag = () => {

        if (!nameRef.current) {
            return;
        }

        const formData = new FormData();
        formData.append('flagName', nameRef.current.value);
        formData.append('flagStatus', enabled.toString());

        if (descriptionRef.current) {
            formData.append('flagDescription', descriptionRef.current.value);
        }

        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/flags/`, {
            method: props.flag ? "PUT" : "POST",
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
                props.refreshFlags();
                props.setOpen(false);
            } else {
                let msg = "Generic error occurred, please try again.";
                if (respJson.errorCode === "error_input") {
                    msg = "One or more required information are missing.";
                } else if (respJson.errorCode === "error_alreadysaved") {
                    msg = "There is already a flag with the same name.";
                }
                console.log(msg);
            }

        }).catch(error => { console.log(error) });
    } 
      
    return (

        <Transition.Root show={props.open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={props.setOpen}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                                        <div className="h-0 flex-1 overflow-y-auto">
                                            <div className="bg-emerald-500 px-4 py-6 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <Dialog.Title className="text-lg font-semibold leading-6 text-white">
                                                        {props.title}
                                                    </Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="rounded-md bg-emerald-500 text-emerald-200 hover:text-white focus:outline-none focus:ring-2"
                                                            onClick={() => props.setOpen(false)}
                                                        >
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-1">
                                                    <p className="text-base text-emerald-300">
                                                       {props.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex flex-1 flex-col justify-between">
                                                <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                    <div className="space-y-6 pb-5 pt-6">
                                                        <FadeIn delay="delay-[200ms]">
                                                            <label
                                                                htmlFor="project-name"
                                                                className="block text-base font-medium leading-6 text-gray-900"
                                                            >
                                                                Name
                                                            </label>
                                                            <div className="mt-2">
                                                                <input
                                                                    type="text"
                                                                    defaultValue={props.flag?.name}
                                                                    ref={nameRef}
                                                                    className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 
                                                                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-base sm:leading-6"
                                                                />
                                                            </div>
                                                        </FadeIn>
                                                        <FadeIn delay="delay-[400ms]">
                                                            <label
                                                                htmlFor="description"
                                                                className="block text-base font-medium leading-6 text-gray-900"
                                                            >
                                                                Description
                                                            </label>
                                                            <div className="mt-2">
                                                                <textarea
                                                                    ref={descriptionRef}
                                                                    defaultValue={props.flag?.description}
                                                                    rows={4}
                                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                                                 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-base sm:leading-6"
                                                                />
                                                            </div>
                                                        </FadeIn>

                                                         <FadeIn delay="delay-[600ms]">
                                                            <fieldset>
                                                                <legend className="text-base font-medium leading-6 text-gray-900">Enabled</legend>
                                                                <div className="mt-2 space-y-4">
                                                                    <Switch
                                                                        checked={enabled}
                                                                        onChange={setEnabled}
                                                                        className={classNames(
                                                                            enabled ? 'bg-emerald-600' : 'bg-gray-200',
                                                                            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ',
                                                                            'focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2'
                                                                        )}
                                                                    >
                                                                        <span className="sr-only">Enabled</span>
                                                                        <span
                                                                            aria-hidden="true"
                                                                            className={classNames(
                                                                                enabled ? 'translate-x-5' : 'translate-x-0',
                                                                                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                                                                            )}
                                                                        />
                                                                    </Switch>
                                                                </div>

                                                            </fieldset>
                                                        </FadeIn>  
                                                    </div>
                                                    <div className="pb-6 pt-4">
                                                        <FadeIn delay="delay-[800ms]">
                                                            <div className="mt-4 flex text-base">
                                                                <a href="/docs/flags" className="group inline-flex items-center text-gray-500 hover:text-gray-900">
                                                                    <QuestionMarkCircleIcon
                                                                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span className="ml-2">Learn more about flags</span>
                                                                </a>
                                                            </div>
                                                        </FadeIn>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                            <button
                                                type="button"
                                                className="rounded-md bg-white px-3 py-2 text-base font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                onClick={props.onCancel}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleCreateFlag}
                                                className="ml-4 inline-flex justify-center rounded-md bg-emerald-600 px-3 py-2 
                                            text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline 
                                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                            >
                                                Save flag
                                            </button>
                                        </div>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root >
    );
}


const FadeIn: React.FC<{ delay: string, children: ReactNode }> = (props) => {

    return (
        <Transition.Child
            enter={`transition-all ease-in-out duration-700 ${props.delay}`}
            enterFrom="opacity-0 translate-y-6"
            enterTo="opacity-100 translate-y-0"
            leave="transition-all ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            {props.children}
        </Transition.Child>
    );
}


