import { Portal, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { Fragment, createContext, useContext, useState } from "react";

export interface Notification {
    icon?: React.ReactNode
    title: string
    description?: string
}

export interface NotificationsContextType {
    notifications: Notification[]
    addNotification: (notification: Notification) => void
    removeNotification: (notification: Notification) => void
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    
    const addNotification = (notification: Notification) => {
        const result = [...notifications];
        result.push(notification);
        if (result.length > 3) {
            result.shift();
        }
        setNotifications(result)
        // setTimeout(() => {
        //     removeNotification(notification);
        // }, 6000)
    };
    
    const removeNotification = (notification: Notification) => {
        setNotifications(notifications.filter(n => n !== notification));
    };

    const value = {
        notifications,
        addNotification,
        removeNotification,
    };
    
    return <NotificationsContext.Provider value={value}>
        {children}
    </NotificationsContext.Provider>;
};

export const useNotifications = () => {
    const context = useContext(NotificationsContext);
    if (context === undefined) {
        throw new Error("useNotifications must be used within a NotificationsProvider");
    }
    return context;
}

export const NotificationsPanel = () => {
    const notifications = useNotifications();

    const show = notifications.notifications.length > 0;

    const setShow = (show: boolean) => {
        if (!show) {
            notifications.removeNotification(notifications.notifications[0]);
        }
    }

    return (
        <div
            aria-live="assertive"
            className="fixed z-[100] inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:px-6 sm:py-12 sm:items-start sm:justify-end"
        >
            <div className="max-w-sm w-full">
                <Transition
                    show={show}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <NotificationCard
                        notification={notifications.notifications[0]}
                        onHide={() => setShow(false)}
                    />
                </Transition>
            </div>
        </div>
    )
}

export const NotificationCard = React.forwardRef((
    { notification, onHide }: { notification: Notification, onHide: () => void },
    forwardedRef: React.Ref<HTMLDivElement>
) => {
    if (!notification) return (<></>)
    return (
        <div 
            className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            ref={forwardedRef}
        >
            <div className="p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        { notification.icon }
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">{ notification.title }</p>
                        <p className="mt-1 text-sm text-gray-500">{ notification.description }</p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                    <button
                        type="button"
                        className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={onHide}
                    >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
})