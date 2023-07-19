import { ReactNode } from "react";
import { SegmentModel } from "../../models/SegmentModel";

export const SegmentsItem: React.FC<{ segment: SegmentModel, setOpen: () => void, children: ReactNode }> = (props) => {

    return (

        <div className="bg-white shadow sm:rounded-lg m-4">
            <div className="w-full hover:cursor-pointer" onClick={props.setOpen} >
                <div className="px-4 py-5 sm:p-6  flex justify-between w-full ">
                    <div className="text-base text-gray-500">
                        <div className="text-base text-left  leading-6 text-gray-900">
                            <span className="font-semibold">{props.segment.name}</span> <span>( {props.segment.description} )</span>

                        </div>
                        <div className="mt-3 text-left">
                            <code className="   py-1 rounded-md text-sm">key: {props.segment.key}</code>
                        </div>
                    </div>
                    <div>
                        <div>
                            <code className="bg-slate-100 px-2 py-1 rounded-md text-sm ml-4">{props.segment.conditions.length} conditions</code>
                        </div>
                        <div className="mt-4">
                            <code className="bg-green-100 px-2 py-1 rounded-md text-sm ml-4">matching {props.segment.matching}</code>
                        </div>
                    </div>
                </div>
            </div>
            {props.children}
        </div>
    );
};
