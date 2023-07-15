import { XMarkIcon } from "@heroicons/react/24/outline";
import { ConditionModel } from "../../models/SegmentModel";

export const ConditionsItem: React.FC<{ condition: ConditionModel, removeCondition: () => void }> = (props) => {

    return (
        <div className="bg-gray-50/70 shadow sm:rounded-lg mx-1 ">

            <div className="px-4 py-3 flex text-base text-gray-500 justify-between ">
                
                    <div className="text-base  leading-6 text-gray-900 ">
                        <span className="font-semibold">{props.condition.context}</span>
                    </div>
                    <div>
                        {props.condition.operator}
                    </div>
                    <div>
                        {props.condition.value}
                    </div>
                    <div>
                        {props.condition.conditionType}
                    </div>
               

                <button
                 type="button"
                    onClick={props.removeCondition}
                    className="rounded-md p-2 
                       text-base font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"><XMarkIcon className="h-4 w-4 text-gray-400" /></button>
            </div>  

        </div>
    );
};
