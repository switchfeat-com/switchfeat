import { useEffect, useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { DashboardLayout } from "../layout/DashboardLayout";
import { SectionEmptyState } from "../components/shared/SectionEmptyState";
import * as keys from "../config/keys";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SegmentModel } from "../models/SegmentModel";
import { SegmentsItem } from "../components/segments/SegmentsItem";
import { CreateOrUpdateSegmentDialog, CreateOrUpdateSegmentDialogProps } from "../components/segments/CreateOrUpdateSegmentDialog";


export const Segments: React.FC = () => {
  const [segments, setSegments] = useState<SegmentModel[]>([]);
  const [refreshSegments, setRefreshSegments] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleRefreshSegments = (): void => {
    setRefreshSegments(!refreshSegments);
  };

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

      setLoading(false);
    }).catch(ex => { console.log(ex); });
  }, [refreshSegments]);

  const createFlagProps: CreateOrUpdateSegmentDialogProps = {
    open,
    setOpen,
    onCancel: () => { setOpen(false); },
    title: "Create segment",
    description: "Create a new user segment.",
    refreshAll: handleRefreshSegments,
  };

  const CreateSegmentButton: React.FC = () => {
    return (
      <button
        onClick={() => { setOpen(!open); }}
        type="button"
        className="inline-flex items-center rounded-md border
                border-transparent bg-emerald-500 px-3 py-2
                text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        Create Segment
      </button>);
  };

  return (
    <DashboardLayout>
      <> {!loading && (
        <>
          {segments.length === 0 && <SectionEmptyState type="segments"> <CreateSegmentButton /> </SectionEmptyState>}
          {segments.length > 0 &&
            <>
              <SectionHeader title="Segments"> <CreateSegmentButton /></SectionHeader>

              {segments.map((item, idx) => (
                <SegmentsItem key={idx} segment={item} refreshSegments={handleRefreshSegments} />
              ))}
            </>
          }
        </>
      )}
   <CreateOrUpdateSegmentDialog {...createFlagProps} />
      </>
    </DashboardLayout>
  );
};
