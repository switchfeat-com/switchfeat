import { useEffect, useState } from "react";
import { SectionHeader } from "../components/SectionHeader";
import { DashboardLayout } from "../layout/DashboardLayout";
import { SectionEmptyState } from "../components/shared/SectionEmptyState";
import { FlagModel } from "../models/FlagModel";
import * as keys from "../config/keys";
import { FlagsItem } from "../components/flags/FlagsItem";
import { CreateOrUpdateFlagDialog, CreateOrUpdateFlagDialogProps } from "../components/flags/CreateOrUpdateFlagDialog";
import { PlusIcon } from "@heroicons/react/24/outline";

export const Flags: React.FC = () => {
  const [flags, setFlags] = useState<FlagModel[]>([]);
  const [refreshFlags, setRefreshFlags] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleRefreshFlags = (): void => {
    setRefreshFlags(!refreshFlags);
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/flags/`, {
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
      setFlags([]);
      const allFlags: FlagModel[] = [];
      respJson.flags.forEach((item: FlagModel) => {
        allFlags.push({
          name: item.name,
          description: item.description,
          status: item.status,
          createdOn: item.createdOn,
          updatedOn: item.updatedOn,
          key: item.key,
          rules: item.rules
        });
      });

      setFlags(allFlags);
      setLoading(false);
    }).catch(ex => { console.log(ex); });
  }, [refreshFlags]);

  const createFlagProps: CreateOrUpdateFlagDialogProps = {
    open,
    setOpen,
    onCancel: () => { setOpen(false); },
    title: "Create flag",
    description: "Get started by creating your new feature flag.",
    refreshAll: handleRefreshFlags,
  }; 

  const CreateFlagButton: React.FC = () => {
    return (
            <button
                onClick={() => { setOpen(!open); }}
                type="button"
                className="inline-flex items-center rounded-md border
                border-transparent bg-emerald-500 px-3 py-2
                text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Create Flag
            </button>);
  };

  return (
        <DashboardLayout>
            <> {!loading && (
                <>
                    {flags.length === 0 && <SectionEmptyState type="flags"> <CreateFlagButton /> </SectionEmptyState>}
                    {flags.length > 0 &&
                        <>
                            <SectionHeader title="Flags"> <CreateFlagButton /></SectionHeader>

                            {flags.map((item, idx) => (
                                <FlagsItem key={idx} flag={item} handleRefreshFlags={handleRefreshFlags} />
                            ))}
                        </>
                    } </>
            )}
                <CreateOrUpdateFlagDialog {...createFlagProps} />
            </>
        </DashboardLayout>
  );
};
