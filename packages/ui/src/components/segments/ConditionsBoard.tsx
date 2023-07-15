import { useRef, useState } from "react";
import { ConditionModel } from "../../models/SegmentModel";
import { XMarkIcon } from "@heroicons/react/24/outline";

export type ConditionsBoardProps = {
    handleAddCondition: (newCondition: ConditionModel) => void;
};

export const ConditionsBoard: React.FC<ConditionsBoardProps> = (props) => {

    const contextRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<HTMLInputElement>(null);
    const [selectedType, setSelectedType] = useState<string>("boolean");
    const [selectedOp, setSelectedOp] = useState<string>("true");

    const supportedTypes: { [key: string]: string[] } = {};
    supportedTypes["boolean"] = ["true", "false"];
    supportedTypes["string"] = ["equals", "notEquals", "startsWith", "endsWith"];
    supportedTypes["number"] = ["equals", "notEquals", "gt", "lt", "gte", "lte"];
    supportedTypes["datetime"] = ["equals", "notEquals", "before", "after", "beforeOrAt", "afterOrAt"];

    const onChangeSelectedType = (val: string) => {

        setSelectedType(val);
        setSelectedOp(supportedTypes[val][0]);
    };

    const addCondition = () => {

        if (!contextRef.current || !valueRef.current) {
            return;
        }

        const newCondition: ConditionModel = {
            context: contextRef.current.value,
            value: valueRef.current.value,
            conditionType: selectedType,
            operator: selectedOp
        };

        props.handleAddCondition(newCondition);
    }; 

    return (
        <div className="flex  gap-x-6 justify-between mt-5">

            <div className="sm:col-span-2 sm:col-start-1">
                <label htmlFor="city" className="block text-sm   leading-6 text-gray-900">
                    Context
                </label>
                <div className="mt-2">
                    <input
                        ref={contextRef}

                        type="text"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm 
                                   ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 
                                   focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="region" className="block text-sm   leading-6 text-gray-900">
                    Type
                </label>
                <div className="mt-2">
                    <select
                        value={selectedType}
                        onChange={(e) => onChangeSelectedType(e.target.value)}
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 
                                   ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                   sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        {Object.keys(supportedTypes).map((item) => (<option key={item} value={item}>{item}</option>))}
                    </select>
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="country" className="block text-sm   leading-6 text-gray-900">
                    Operator
                </label>
                <div className="mt-2">
                    <select
                        value={selectedOp}
                        onChange={(e) => setSelectedOp(e.target.value)}
                        autoComplete="country-name"
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 
                                   ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                   sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                        {supportedTypes[selectedType].map((item) => (<option key={item} value={item}>{item}</option>))}
                    </select>
                </div>
            </div>

            <div className="sm:col-span-2">
                <label htmlFor="postal-code" className="block text-sm   leading-6 text-gray-900">
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

            <button
                type="button"
                onClick={addCondition}
                className="rounded-md bg-emerald-600 px-3 py-2 h-11 mt-7 mr-0
                       text-base font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600">Add</button>  
        </div>
    );
};