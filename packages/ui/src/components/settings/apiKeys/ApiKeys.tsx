import { FC, useEffect } from "react";
import { Settings } from "../../../pages/Settings";
import { useApiKeys } from "./hooks";
import { SdkAuthModel } from "../../../models/SdkAuthModel";
import { classNames } from "../../../helpers/classHelper";
import * as dateHelper from "../../../helpers/dateHelper";
import { CreateApiKey } from "./CreateApiKey";
import { DeleteApiKey } from "./DeleteApiKey";


export const ApiKeys: FC = () => {

    const hookState = useApiKeys();

    return (
        <Settings>
            <div className="px-4 sm:px-6 lg:px-8 py-6">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-lg font-semibold leading-6 text-gray-900">API Keys</h1>
                        <p className="mt-2 text-lg text-gray-700">
                            Please note, <strong className="font-semibold text-gray-900">we do not display</strong> your secret API keys again after you generate them.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                       <CreateApiKey hookState={hookState} />
                    </div>
                </div>
                <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-base font-semibold text-gray-900 sm:pl-6">
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-base font-semibold text-gray-900 lg:table-cell"
                                >
                                    Key
                                </th>
                                <th
                                    scope="col"
                                    className="hidden px-3 py-3.5 text-left text-base font-semibold text-gray-900 lg:table-cell"
                                >
                                    Expires On
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-base font-semibold text-gray-900">
                                    Last used on
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                    <span className="sr-only">Select</span>
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {hookState.sdkAuths.map((x: SdkAuthModel, idx: number) => (
                                <tr key={idx}>

                                    <td
                                        className={classNames(
                                            idx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-lg text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {x.name}
                                    </td>

                                    <td
                                        className={classNames(
                                            idx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-lg text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        <code className="bg-gray-200 rounded-lg p-2">{x.apiKey}</code>
                                    </td>
                                    <td
                                        className={classNames(
                                            idx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-lg text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {dateHelper.formatDateTime(x.expiresOn, true)}
                                    </td>
                                    <td
                                        className={classNames(
                                            idx === 0 ? '' : 'border-t border-gray-200',
                                            'hidden px-3 py-3.5 text-lg text-gray-500 lg:table-cell'
                                        )}
                                    >
                                        {dateHelper.formatDateTime(x.createdOn, true)}
                                    </td>

                                    <td
                                        className={classNames(
                                            idx === 0 ? '' : 'border-t border-transparent',
                                            'relative py-3.5 pl-3 pr-4 text-right text-lg font-medium sm:pr-6'
                                        )}
                                    >
                                        <DeleteApiKey sdkAuthKey={x.key} hookState={hookState} /> 
                                        {idx !== 0 ? <div className="absolute -top-px left-0 right-0 h-px bg-gray-200" /> : null}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Settings>
    );
};