import { useEffect, useState } from "react";
import { FlagsList } from "../components/FlagsList";
import { SectionHeader } from "../components/SectionHeader";
import { DashboardLayout } from "./DashboardLayout";
import { SectionEmptyState } from "../components/SectionEmptyState";
import { CreateFlag } from "../components/CreateFlag";
import { FlagModel } from "../models/FlagModel";
import * as keys from "../config/keys";


export const Dashboard: React.FC = (props) => {

    const [flags, setFlags] = useState<FlagModel[]>([]);
    const [refreshFlags, setRefreshFlags] = useState<boolean>(true);

    const handleRefreshFlags = () => {
        setRefreshFlags(!refreshFlags);
    }; 

    useEffect(() => {


        fetch(`${keys.CLIENT_HOME_PAGE_URL}/api/flags/`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "true"
            }
        }).then(resp => {
            return resp.json();
        }).then(respJson => {
            setFlags([]);
            let allFlags: FlagModel[] = [];
            respJson.flags.forEach((item: any) => {
                allFlags.push({
                    name: item.name,
                    description: item.description,
                    status: item.status,
                    createdOn: item.createdOn, 
                    updatedOn: item.updatedOn,
                    key: item.key
                });
            });

            setFlags(allFlags);

            console.log(allFlags);
        }).catch(ex => { console.log(ex)});

    }, [refreshFlags]);



    return (
        <DashboardLayout>
            <>
                {flags.length === 0 && <SectionEmptyState type="flags"> <CreateFlag refreshFlagsList={handleRefreshFlags} /> </SectionEmptyState>}
                {flags.length > 0 &&
                    <>
                        <SectionHeader title="Flags"> <CreateFlag refreshFlagsList={handleRefreshFlags} /></SectionHeader>
                        <FlagsList flags={flags} />
                    </>
                }
            </>
        </DashboardLayout>
    );
}