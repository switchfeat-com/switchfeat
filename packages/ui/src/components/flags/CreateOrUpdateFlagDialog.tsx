import { Transition, Dialog, Switch } from "@headlessui/react";
import { XMarkIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import * as keys from "../../config/keys";
import { FlagModel, RuleModel } from "../../models/FlagModel";
import { classNames } from "../../helpers/classHelper";
import { ConfirmationDialog, ConfirmationDialogProps } from "../shared/ConfirmationDialog";
import { RulesBoard } from "./RulesBoard";
import { RulesItem } from "./RulesItem";

export interface CreateOrUpdateFlagDialogProps {
    open: boolean
    setOpen: (state: boolean) => void
    onCancel: () => void
    title: string
    description: ReactNode
    flag?: FlagModel
    refreshAll: () => void
}

export const CreateOrUpdateFlagDialog: React.FC<CreateOrUpdateFlagDialogProps> = (props) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [enabled, setEnabled] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [rules, setRules] = useState<RuleModel[]>([]);


    useEffect(() => {
        if ((!props.flag) || !props.open) {
            return;
        }

        setEnabled(props.flag.status);
        setRules(props.flag.rules);
    }, [props.flag, props.open]);


    const handleCreateOrUpdateFlag = (): void => {
        if (!nameRef.current) {
            return;
        }

        const formData = new FormData();
        formData.append('flagName', nameRef.current.value);
        formData.append('flagStatus', enabled.toString());
        formData.append('flagRules', JSON.stringify(rules));

        if (props.flag) {
            formData.append('flagKey', props.flag.key);
        }

        if (descriptionRef.current) {
            formData.append('flagDescription', descriptionRef.current.value);
        }

        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/flags/`, {
            method: (props.flag) ? "PUT" : "POST",
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
                props.refreshAll();
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
        }).catch(error => { console.log(error); });
    };

    const onConfirmDelete = (): void => {
        const formData = new FormData();
        if (props.flag) {
            formData.append('flagKey', props.flag.key);
        }

        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/flags/`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "true",
            },
            body: formData,
        }).then(async resp => {
            return resp.json();
        }).then(respJson => {
            if (respJson.success as boolean) {
                setShowDelete(false);
                props.refreshAll();
            }
        }).catch(error => { console.log(error); });
    };

    const deleteFlagProps: ConfirmationDialogProps = {
        show: showDelete,
        setShow: setShowDelete,
        onConfirm: onConfirmDelete,
        onCancel: () => { setShowDelete(false); },
        title: "Confirm flag delete",
        description: <>
            <span>Are you sure you want to </span>
            <span className="font-bold">delete</span><span> this flag?</span>
            <div className="py-3"><code className="bg-slate-100 px-2 py-1 rounded-md text-sm">{props.flag?.key}</code></div>
            <div>Any subsequent API call will return with a <code>NotFound (404)</code> error.</div>
        </>,
        icon: <QuestionMarkCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />,
        accent: "red",
    };

    const handleAddRule = (currRule: RuleModel) => {
        const temp = [...rules];
        temp.push(currRule);
        setRules([...temp]);
    };

    const handleEditRule = (currRule: RuleModel) => {
        const temp = [...rules];
        const found = rules.find(x => x.key === currRule.key);
        if (found) {
            found.segment = currRule.segment;
            setRules([...temp]);
        }
    };

    const handleRemoveRule = (item: RuleModel) => {
        const temp = [...rules];
        setRules([...temp.filter(x => x !== item)]);
    };

    return (
        <>
            <Transition.Root show={props.open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={props.setOpen}  initialFocus={nameRef}>
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
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
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
                                                                onClick={() => { props.setOpen(false); }}
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
                                                        <div className="  pb-5 pt-6">

                                                            <label
                                                                htmlFor="project-name"
                                                                className="block text-base font-medium leading-6 text-gray-900 py-3">
                                                                Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                defaultValue={props.flag?.name}
                                                                ref={nameRef}
                                                                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                                                                shadow-sm ring-1 ring-inset ring-gray-300 
                                                                 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                 focus:ring-emerald-600 sm:text-base sm:leading-6"
                                                            />
                                                            <label
                                                                htmlFor="description"
                                                                className="block text-base font-medium leading-6 text-gray-900 py-3">
                                                                Description
                                                            </label>
                                                            <input
                                                                type="text"
                                                                ref={descriptionRef}
                                                                defaultValue={props.flag?.description}
                                                                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                                                                shadow-sm ring-1 ring-inset ring-gray-300
                                                                 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                 focus:ring-emerald-600 sm:text-base sm:leading-6"
                                                            />
                                                            <fieldset className="mt-4">
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

                                                            <div className="mt-6">
                                                                <label className="text-base font-semibold text-gray-900">Rules</label>
                                                                <p className="text-base text-gray-500">Create rules to assign segments to this flag.<br /> Rules get evaluate in order.</p>
                                                                <RulesBoard handleAddOrUpdateRule={handleAddRule} />
                                                                <div className="space-y-4 mt-4">
                                                                    {rules.length > 0 && rules.map((item: RuleModel, idx) => (
                                                                        <RulesItem rule={item} key={idx} removeRule={() => handleRemoveRule(item)} >
                                                                            <RulesBoard toEditRule={item}
                                                                                handleAddOrUpdateRule={handleEditRule} />
                                                                        </RulesItem>
                                                                    ))}
                                                                    {rules.length === 0 && (
                                                                        <div className="text-center text-lg mt-4">No rules available</div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="pb-6 pt-4">

                                                            <div className="mt-4 flex text-base">
                                                                <a href="https://docs.switchfeat.com/concepts/flags" target="_blank" rel="noreferrer" 
                                                                className="group inline-flex items-center text-gray-500 hover:text-gray-900">
                                                                    <QuestionMarkCircleIcon
                                                                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span className="ml-2">Learn more about flags</span>
                                                                </a>
                                                            </div>

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
                                                    type="button"
                                                    onClick={() => setShowDelete(true)}
                                                    className="ml-4 inline-flex justify-center rounded-md bg-red-700 px-3 py-2
                                                               text-base font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline
                                                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                                >
                                                    Delete flag
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCreateOrUpdateFlag}
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
            <ConfirmationDialog {...deleteFlagProps} />
        </>
    );
};
