import { useEffect, useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { SectionEmptyState } from "../components/shared/SectionEmptyState";
import * as keys from "../config/keys";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SegmentModel } from "../models/SegmentModel";
import { SegmentsItem } from "../components/segments/SegmentsItem";
import {
    CreateOrUpdateSegmentDialog,
    CreateOrUpdateSegmentDialogProps,
} from "../components/segments/CreateOrUpdateSegmentDialog";
import { useFetch } from "../hooks/useFetch";

export const Segments: React.FC = () => {
    const [segments, setSegments] = useState<SegmentModel[]>([]);
    const [refreshSegments, setRefreshSegments] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const { doFetch } = useFetch();

    const handleRefreshSegments = (): void => {
        setRefreshSegments(!refreshSegments);
    };

    const onFetchSuccess = (fetchResp: SegmentModel[]) => {
        setSegments([]);
        const allSegments: SegmentModel[] = [];
        fetchResp.forEach((item: SegmentModel) => {
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

        setLoading(false);
    };

    useEffect(() => {
        setLoading(true);
        doFetch<SegmentModel[], unknown>({
            onSuccess: onFetchSuccess,
            onError: () => {},
            url: `${keys.CLIENT_HOME_PAGE_URL}/api/segments/`,
            method: "GET",
        });
    }, [doFetch, refreshSegments]);

    const createSegmentProps: CreateOrUpdateSegmentDialogProps = {
        open,
        setOpen,
        onCancel: () => {
            setOpen(!open);
        },
        title: "Create segment",
        description: "Create a new user segment.",
        refreshAll: handleRefreshSegments,
    };

    const CreateSegmentButton: React.FC = () => {
        return (
            <button
                onClick={() => {
                    setOpen(!open);
                }}
                type="button"
                className="inline-flex items-center rounded-md border
                border-transparent bg-emerald-500 px-3 py-2
                text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create Segment
            </button>
        );
    };

    return (
        <>
            {" "}
            {!loading && (
                <>
                    {segments.length === 0 && (
                        <SectionEmptyState type="segments">
                            {" "}
                            <CreateSegmentButton />{" "}
                        </SectionEmptyState>
                    )}
                    {segments.length > 0 && (
                        <>
                            <SectionHeader title="Segments">
                                {" "}
                                <CreateSegmentButton />
                            </SectionHeader>

                            {segments.map((item, idx) => (
                                <SegmentsItem
                                    key={idx}
                                    segment={item}
                                    handleRefreshSegments={
                                        handleRefreshSegments
                                    }
                                />
                            ))}
                        </>
                    )}
                </>
            )}
            <CreateOrUpdateSegmentDialog {...createSegmentProps} />
        </>
    );
};
