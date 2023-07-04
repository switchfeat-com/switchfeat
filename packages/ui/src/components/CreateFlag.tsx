import { Dialog, Switch, Transition } from '@headlessui/react';
import { CheckCircleIcon, PlusIcon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Fragment, ReactNode, useRef, useState } from 'react';
import { classNames } from '../helpers/classHelper';
import { useNotifications } from '../services/notifications';
import { useAPI } from '../utils/api';

export const CreateFlag: React.FC<{refreshFlagsList: () => void}> = (props) => {
    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const nameRef = useRef<any>(null);
    const descriptionRef = useRef<any>(null);
    const notifications = useNotifications()
    const api = useAPI()

    const handleCreateFlag = async () => {
        if (!nameRef.current) {
            return;
        }

        try {
            await api.post('/api/flags', {
                flagName: nameRef.current.value,
                flagDescription: descriptionRef.current ? descriptionRef.current.value : null,
            })
            notifications.addNotification({
                icon: <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />,
                title: "Flag created",
                description: `The flag ${nameRef.current.value} was created successfully.`,
            });
        } catch (error) {
            setOpen(false);
        }

        props.refreshFlagsList();
        setOpen(false);
    }

    function onClick() {
        setOpen(!open)
    }

    return (
        <>
            <button
                onClick={onClick}
                type="button"
                className="inline-flex items-center rounded-md border 
                border-transparent bg-emerald-500 px-3 py-2 
                text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create Flag
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setOpen}>
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
                                                        <Dialog.Title className="text-base font-semibold leading-6 text-white">
                                                            New feature flag
                                                        </Dialog.Title>
                                                        <div className="ml-3 flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                className="rounded-md bg-emerald-500 text-emerald-200 hover:text-white focus:outline-none focus:ring-2"
                                                                onClick={() => setOpen(false)}
                                                            >
                                                                <span className="sr-only">Close panel</span>
                                                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="mt-1">
                                                        <p className="text-base text-emerald-300">
                                                            Get started by creating your new feature flag.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-1 flex-col justify-between">
                                                    <div className="divide-y divide-gray-200 px-4 sm:px-6">
                                                        <div className="space-y-6 pb-5 pt-6">
                                                            <FadeIn delay="delay-[200ms]">
                                                                <label
                                                                    htmlFor="project-name"
                                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                                >
                                                                    Name
                                                                </label>
                                                                <div className="mt-2">
                                                                    <input
                                                                        type="text"
                                                                        ref={nameRef}
                                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 
                                                                        shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                                                    />
                                                                </div>
                                                            </FadeIn>
                                                            <FadeIn delay="delay-[400ms]">
                                                                <label
                                                                    htmlFor="description"
                                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                                >
                                                                    Description
                                                                </label>
                                                                <div className="mt-2">
                                                                    <textarea
                                                                      
                                                                        ref={descriptionRef}
                                                                        rows={4}
                                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset
                                                                         ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                                                        defaultValue={''}
                                                                    />
                                                                </div>
                                                            </FadeIn>

                                                            <FadeIn delay="delay-[600ms]">
                                                                <fieldset>
                                                                    <legend className="text-sm font-medium leading-6 text-gray-900">Enabled</legend>
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
                                                                <div className="mt-4 flex text-sm">
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
                                                    onClick={() => setOpen(false)}
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
        </>
    )
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



