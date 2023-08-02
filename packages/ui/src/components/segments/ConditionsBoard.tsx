import { useEffect, useRef, useState } from "react";
import { ConditionModel } from "../../models/SegmentModel";
import { classNames } from "../../helpers/classHelper";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { generateGuid } from "../../helpers/entityHelper";

export type ConditionsBoardProps = {
    toEditCondition?: ConditionModel;
    handleAddOrUpdateCondition: (newCondition: ConditionModel) => void;
};

export const ConditionsBoard: React.FC<ConditionsBoardProps> = (props) => {
    const contextRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);
    const [selectedType, setSelectedType] = useState<string>("boolean");
    const [selectedOp, setSelectedOp] = useState<string>("true");

    const supportedTypes: { [key: string]: string[] } = {};
    supportedTypes["boolean"] = ["true", "false"];
    supportedTypes["string"] = [
        "equals",
        "notEquals",
        "startsWith",
        "endsWith",
    ];
    supportedTypes["number"] = [
        "equals",
        "notEquals",
        "gt",
        "lt",
        "gte",
        "lte",
    ];
    supportedTypes["datetime"] = [
        "equals",
        "notEquals",
        "before",
        "after",
        "beforeOrAt",
        "afterOrAt",
    ];

    useEffect(() => {
        if (props.toEditCondition && contextRef.current && valueRef.current) {
            contextRef.current.value = props.toEditCondition.context;
            valueRef.current.value = props.toEditCondition.value ?? "";
            setSelectedOp(props.toEditCondition.operator);
            setSelectedType(props.toEditCondition.conditionType);
        }
    }, [props.toEditCondition]);

    const onChangeSelectedType = (val: string) => {
        setSelectedType(val);
        setSelectedOp(supportedTypes[val][0]);
    };

    const addCondition = () => {
        if (
            !contextRef.current ||
            (selectedType !== "boolean" && !valueRef.current)
        ) {
            return;
        }

        const newCondition: ConditionModel = {
            context: contextRef.current.value,
            value:
                selectedType !== "boolean"
                    ? valueRef.current?.value
                    : undefined,
            conditionType: selectedType,
            operator: selectedOp,
            key: !props.toEditCondition
                ? generateGuid("condition")
                : props.toEditCondition.key,
        };

        props.handleAddOrUpdateCondition(newCondition);

        if (!props.toEditCondition) {
            contextRef.current.value = "";
            if (valueRef.current) valueRef.current.value = "";
        }
    };

    return (
        <div
            className={classNames(
                "flex  gap-x-6 justify-between mt-0 bg-white-50",
                props.toEditCondition
                    ? "mt-0"
                    : "mt-4 shadow rounded-lg p-4 bg-emerald-100",
            )}
        >
            <div className="flex">
                <div className="sm:col-span-2 sm:col-start-1">
                    <label
                        htmlFor="city"
                        className="block text-sm   leading-6 text-gray-900"
                    >
                        Context
                    </label>
                    <div className="mt-2">
                        <input
                            ref={contextRef}
                            type="text"
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm 
                                   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                   focus:ring-inset focus:ring-emerald-400 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div className=" ml-4">
                    <label
                        htmlFor="region"
                        className="block text-sm   leading-6 text-gray-900"
                    >
                        Type
                    </label>
                    <div className="mt-2">
                        <select
                            value={selectedType}
                            onChange={(e) =>
                                onChangeSelectedType(e.target.value)
                            }
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 
                                   ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                   sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {Object.keys(supportedTypes).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className=" ml-4">
                    <label
                        htmlFor="country"
                        className="block text-sm   leading-6 text-gray-900"
                    >
                        Operator
                    </label>
                    <div className="mt-2">
                        <select
                            value={selectedOp}
                            onChange={(e) => setSelectedOp(e.target.value)}
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 
                                   ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                   sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {supportedTypes[selectedType].map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div
                    className={classNames(
                        " ml-4",
                        selectedType === "boolean" ? "hidden" : "",
                    )}
                >
                    <label
                        htmlFor="postal-code"
                        className="block text-sm   leading-6 text-gray-900"
                    >
                        Value
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            ref={valueRef}
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={addCondition}
                className="rounded-md p-2 bg-gray-100
                       text-base font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline mt-8 h-10
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
                {props.toEditCondition ? (
                    <PencilIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                ) : (
                    <PlusIcon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                    />
                )}
            </button>
        </div>
    );
};
