import { Dialog, Switch, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { classNames } from "../helpers/classHelper"; 
import * as dateHelper from "../helpers/dateHelper";
import * as keys from "../config/keys";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { FlagActions } from "./FlagActions";
import { SegmentModel } from "../models/SegmentModel";

export const SegmentsItem: React.FC<{ segment: SegmentModel, refreshSegments: () => void }> = (props) => {  

    return (
        <>
            <div className="bg-white shadow sm:rounded-lg m-4">
                <Switch.Group as="div" className="px-4 py-5 sm:p-6">

                    <div className=" sm:flex sm:items-start sm:justify-between">
                        <div className="max-w-xl text-base text-gray-500">
                            <div className="text-base  leading-6 text-gray-900">
                                <span className="font-semibold">{props.segment.name}</span>  
                                <code className="bg-slate-100 px-2 py-1 rounded-md text-sm ml-4">{props.segment.key}</code>
                            </div>
                            <div className="mt-3">
                                <Switch.Description>
                                    {props.segment.description}
                                </Switch.Description>
                            </div>
                        </div>
                         
                    </div>
                </Switch.Group>
            </div>  
        </>
    );
};
