import { ReactNode, useState } from "react";
import { SegmentModel } from "../../models/SegmentModel";
import { CreateOrUpdateSegmentDialog, CreateOrUpdateSegmentDialogProps } from "./CreateOrUpdateSegmentDialog";

export const SegmentsItem: React.FC<{ segment: SegmentModel, handleRefreshSegments: () => void }> = (props) => {

    const [openEdit, setOpenEdit] = useState(false);

    const editSegmentProps: CreateOrUpdateSegmentDialogProps = {
        open: openEdit,
        setOpen: setOpenEdit,
        onCancel: () => { setOpenEdit(!openEdit); },
        title: "Edit segment",
        description: "Edit this segment.",
        refreshAll: props.handleRefreshSegments,
    };

    return (

        <div className="bg-white shadow sm:rounded-lg m-4">
            <div className="w-full hover:cursor-pointer" onClick={() => setOpenEdit(!openEdit)} >
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
            <CreateOrUpdateSegmentDialog {...editSegmentProps} segment={props.segment} />
        </div>
    );
};
