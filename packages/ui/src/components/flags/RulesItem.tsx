import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { RuleModel } from "../../models/FlagModel";

export const RulesItem: React.FC<{ rule: RuleModel, removeRule: () => void, children: ReactNode }> = (props) => { 
    
    return (
        <div className="bg-gray-50/70 shadow sm:rounded-lg mx-1 ">

            <div className="px-4 py-3 flex text-base text-gray-500 justify-between ">

                <div className="flex">
                    <div className="text-base  leading-6 text-gray-900 ">
                        <span className="font-semibold">{props.rule.segment.name}</span>
                    </div>
                    
                </div> 
                <button
                    type="button"
                    onClick={props.removeRule}
                    className="rounded-md p-2 bg-gray-100
                       text-base font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"><XMarkIcon className="h-4 w-4 text-gray-400" /></button>
            </div>
            <div className="p-4 border-t border-t-gray-100">
                {props.children}
            </div>

        </div>
    );
};
