import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { ConditionModel, SegmentModel } from "../../models/SegmentModel";
import { Transition, Dialog } from "@headlessui/react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as keys from "../../config/keys";
import { ConditionsBoard } from "./ConditionsBoard";
import { ConditionsItem } from "./ConditionsItem";
import { ConfirmationDialog, ConfirmationDialogProps } from "../shared/ConfirmationDialog";


export type CreateOrUpdateSegmentDialogProps = {
    open: boolean,
    setOpen: (state: boolean) => void,
    onCancel: () => void,
    title: string,
    description: ReactNode,
    segment?: SegmentModel,
    refreshAll: () => void
};


export const CreateOrUpdateSegmentDialog: React.FC<CreateOrUpdateSegmentDialogProps> = (props) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [matching, setMatching] = useState("all");
    const [conditions, setConditions] = useState<ConditionModel[]>([]);
    const [showDelete, setShowDelete] = useState(false);

    useEffect(() => {
        if (props.segment) {
            setConditions(props.segment.conditions);
            setMatching(props.segment.matching);
        }
    }, [props.segment]);

    const handleAddCondition = (newCondition: ConditionModel) => {
        const temp = [...conditions];
        temp.push(newCondition);
        setConditions([...temp]);
    };

    const handleEditCondition = (currCondition: ConditionModel) => {
        const temp = [...conditions];
        const found = conditions.find(x => x.key === currCondition.key);
        if (found) {
            found.context = currCondition.context;
            found.conditionType = currCondition.conditionType;
            found.operator = currCondition.operator;
            found.value = currCondition.value;
            console.log(temp);
            setConditions([...temp]);
        }
    };

    const handleRemoveCondition = (item: ConditionModel) => {
        console.log("remove condition");
        const temp = [...conditions];
        setConditions([...temp.filter(x => x !== item)]);
    };

    const supportedMatching = [
        { id: 'all', title: 'All conditions' },
        { id: 'any', title: 'Any condition' },
    ];

    const handleCreateOrUpdateSegment = (): void => {
        if (!nameRef.current) {
            return;
        }

        const formData = new FormData();
        formData.append('segmentName', nameRef.current.value);
        formData.append('segmentMatching', matching);
        formData.append('segmentConditions', JSON.stringify(conditions));

        if (props.segment) {
            formData.append('segmentKey', props.segment.key);
        }

        if (descriptionRef.current) {
            formData.append('segmentDescription', descriptionRef.current.value);
        }

        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/segments/`, {
            method: (props.segment) ? "PUT" : "POST",
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

    const MatchingRadio = () => {
        return (
            <div className="mt-6">
                <label className="text-base font-semibold text-gray-900 py-4">Matching</label>
                <p className="text-sm text-gray-500">Select a matching criteria for your segment conditions.</p>
                <fieldset className="mt-4">
                    <legend className="sr-only">Matching conditions</legend>
                    <div className=" sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                        {supportedMatching.map((item) => (
                            <div key={item.id} className="flex items-center">
                                <input
                                    name="matching-radio"
                                    id={item.id}
                                    type="radio"
                                    onChange={() => setMatching(item.id)}
                                    checked={matching === item.id}
                                    className="h-4 w-4 border-gray-300 text-emerald-600 focus:ring-emerald-600"
                                />
                                <label htmlFor={item.id} className="ml-3 block text-base font-medium leading-6 text-gray-900">
                                    {item.title}
                                </label>
                            </div>
                        ))}
                    </div>
                </fieldset>
            </div>
        );
    };

    const onConfirmDelete = (): void => {

        if (!props.segment) {
            return;
        }

        const formData = new FormData();
        formData.append('segmentKey', props.segment.key);

        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/segments/`, {
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

    const deleteSegmentProps: ConfirmationDialogProps = {
        show: showDelete,
        setShow: setShowDelete,
        onConfirm: onConfirmDelete,
        onCancel: () => { setShowDelete(false); },
        title: "Confirm segment delete",
        description: <>
            <span>Are you sure you want to </span>
            <span className="font-bold">delete</span><span> this segment?</span>
            <div className="py-3"><code className="bg-slate-100 px-2 py-1 rounded-md text-sm">{props.segment?.key}</code></div>
            <div>This segment will be removed from any flag currently using it.</div>
        </>,
        icon: <QuestionMarkCircleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />,
        accent: "red",
    };

    return (
        <>
            <Transition.Root show={props.open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={props.setOpen} initialFocus={nameRef}>
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
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-4xl">
                                        <form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl ">
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
                                                    <div className="divide-y divide-gray-400 px-4 sm:px-6">
                                                        <div className="mt-3">

                                                            <label
                                                                htmlFor="project-name"
                                                                className="block text-base font-medium leading-6 text-gray-900 py-3">
                                                                Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                defaultValue={props.segment?.name}
                                                                ref={nameRef}
                                                                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                                                                shadow-sm ring-1 ring-inset ring-gray-300
                                                                 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                 focus:ring-emerald-600 sm:text-base sm:leading-6"
                                                            />

                                                            <label
                                                                htmlFor="project-name"
                                                                className="block text-base font-medium leading-6 text-gray-900 py-3">
                                                                Description <span className="text-gray-400">(optional)</span>
                                                            </label>
                                                            <input
                                                                type="text"
                                                                defaultValue={props.segment?.name}
                                                                ref={descriptionRef}
                                                                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900
                                                                shadow-sm ring-1 ring-inset ring-gray-300
                                                                 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                                                                 focus:ring-emerald-600 sm:text-base sm:leading-6"
                                                            />


                                                            <MatchingRadio />

                                                            <div className="mt-6">
                                                                <label className="text-base font-semibold text-gray-900">Conditions</label>
                                                                <p className="text-sm text-gray-500">Conditions get evaluate based on the selected matching criteria.</p>
                                                                <ConditionsBoard handleAddOrUpdateCondition={handleAddCondition} />
                                                                <div className="space-y-4 mt-4">
                                                                    {conditions.length > 0 && conditions.map((item: ConditionModel, idx) => (
                                                                        <ConditionsItem condition={item} key={idx} removeCondition={() => handleRemoveCondition(item)} >
                                                                            <ConditionsBoard toEditCondition={item} handleAddOrUpdateCondition={handleEditCondition} />
                                                                        </ConditionsItem>
                                                                    ))}
                                                                     {conditions.length === 0 && (
                                                                        <div className="text-center text-lg mt-4">No conditions available</div>
                                                                    )}
                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="pb-6 pt-4">
                                                            <div className="mt-4 flex text-base">
                                                                <a href="https://docs.switchfeat.com/concepts/segments" target="_blank" rel="noreferrer"  
                                                                className="group inline-flex items-center text-gray-500 hover:text-gray-900">
                                                                    <QuestionMarkCircleIcon
                                                                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                                                        aria-hidden="true"
                                                                    />
                                                                    <span className="ml-2">Learn more about segments</span>
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
                                                    Delete segment
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={handleCreateOrUpdateSegment}
                                                    className="ml-4 inline-flex justify-center rounded-md bg-emerald-600 px-3 py-2
                                                               text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline
                                                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                                                >
                                                    Save segment
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

            <ConfirmationDialog {...deleteSegmentProps} />
        </>
    );
};
