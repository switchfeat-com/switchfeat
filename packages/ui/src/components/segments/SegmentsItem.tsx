import { ReactNode } from "react";
import { SegmentModel } from "../../models/SegmentModel";

export const SegmentsItem: React.FC<{ segment: SegmentModel, setOpen: () => void, children: ReactNode }> = (props) => {




    return (

        <div className="bg-white shadow sm:rounded-lg m-4">
            <button onClick={props.setOpen} >
                <div className="px-4 py-5 sm:p-6 sm:flex sm:items-start sm:justify-between">
                    <div className="max-w-xl text-base text-gray-500">
                        <div className="text-base  leading-6 text-gray-900">
                            <span className="font-semibold">{props.segment.name}</span>
                            <code className="bg-slate-100 px-2 py-1 rounded-md text-sm ml-4">{props.segment.key}</code>
                        </div>
                        <div className="mt-3">
                            {props.segment.description}
                        </div>
                    </div>
                    <div>
                        <div>
                            <code className="bg-slate-100 px-2 py-1 rounded-md text-sm ml-4">{props.segment.conditions.length} conditions</code>
                        </div>
                    </div>
                </div>
            </button>
            {props.children}
        </div>
    );
};
