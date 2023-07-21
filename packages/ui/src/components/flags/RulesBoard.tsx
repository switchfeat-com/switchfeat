import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../helpers/classHelper";
import { RuleModel } from "../../models/FlagModel";
import { generateGuid } from "../../helpers/entityHelper";
import { SegmentModel } from "../../models/SegmentModel";
import { useEffect, useState } from "react";
import * as keys from "../../config/keys";

export type RulesBoardProps = {
    toEditRule?: RuleModel;
    handleAddOrUpdateRule: (newRule: RuleModel) => void;
};

export const RulesBoard: React.FC<RulesBoardProps> = (props) => {

    const [selectedSegment, setSelectedSegment] = useState<SegmentModel>();
    const [segments, setSegments] = useState<SegmentModel[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (props.toEditRule) {
            setSelectedSegment(props.toEditRule.segment);
        }
    }, [props.toEditRule]);

    useEffect(() => {
        setLoading(true);
        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/segments/`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "true"
            }
        }).then(async resp => {
            return resp.json();
        }).then(respJson => {
            setSegments([]);
            const allSegments: SegmentModel[] = [];
            respJson.segments.forEach((item: SegmentModel) => {
                allSegments.push({
                    name: item.name,
                    description: item.description,
                    matching: item.matching,
                    conditions: item.conditions,
                    createdOn: item.createdOn,
                    updatedOn: item.updatedOn,
                    key: item.key,
                });
            });

            setSegments(allSegments);
            setSelectedSegment(allSegments[0]);
            setLoading(false);
        }).catch(ex => { console.log(ex); });
    }, []);


    const addRule = () => {

        if (!selectedSegment) {
            return;
        }

        const newRule: RuleModel = {
            segment: selectedSegment,
            key: !props.toEditRule ? generateGuid("rule") : props.toEditRule.key
        };

        props.handleAddOrUpdateRule(newRule);
    };

    const onChangeSelectedSegment = (val: string) => {
        setSelectedSegment(segments?.filter(x => x.key === val)[0]);
    };

    return (
        <div className={classNames("flex  gap-x-6 justify-between mt-0 bg-white-50", props.toEditRule ? "mt-0" : "mt-4 shadow rounded-lg p-4 bg-emerald-100")}>

            <div className="flex w-full ">
                <div className="w-full mx-4">
                    <label htmlFor="region" className="block text-sm   leading-6 text-gray-900">
                        Segment
                    </label>
                    <div className="mt-2">
                        <select
                            value={selectedSegment?.key}
                            onChange={(e) => onChangeSelectedSegment(e.target.value)}
                            className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 
                                   ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                   sm:max-w-xs sm:text-sm sm:leading-6"
                        >
                            {segments && segments.map((item) => (
                                <option
                                    key={item.key}
                                    value={item.key}>{item.name}</option>))}
                        </select>
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={addRule}
                className="rounded-md p-2 bg-gray-100
                       text-base font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline mt-8 h-10
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
                {props.toEditRule ?
                    <PencilIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> :
                    <PlusIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />}
            </button>
        </div>
    );
};
