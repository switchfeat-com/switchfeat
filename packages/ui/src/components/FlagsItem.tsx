import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import { classNames } from "../helpers/classHelper";
import { FlagModel } from "../models/FlagModel";
import * as dateHelper from "../helpers/dateHelper";

export const FlagsItem: React.FC<{ flag: FlagModel }> = (props) => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        setEnabled(props.flag.status);
    }, [props.flag.status]);

    return (

        <div className="bg-white shadow sm:rounded-lg m-4">
            <Switch.Group as="div" className="px-4 py-5 sm:p-6">

                <div className=" sm:flex sm:items-start sm:justify-between">
                    <div className="max-w-xl text-base text-gray-500">
                        <Switch.Label as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            {props.flag.name}
                        </Switch.Label>
                        <div className="mt-3">
                            <Switch.Description>
                                {props.flag.description}
                            </Switch.Description>
                        </div>
                        <div className="mt-3">
                        <code className="bg-slate-100 px-2 py-1 rounded-md text-sm">{props.flag.key}</code>
                        </div>
                        

                    </div>
                    <div className=" sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center">
                        <div className="flex flex-col">
                            <div className="text-base text-gray-500"> {dateHelper.formatDateTime(props.flag.createdOn)}</div>
                            <div className="text-right">
                                <Switch
                                    checked={enabled}
                                    onChange={setEnabled}
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
    );
}