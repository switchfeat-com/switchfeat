import { useEffect, useState } from "react";
import { FlagsList } from "../components/FlagsList";
import { SectionHeader } from "../components/SectionHeader";
import { DashboardLayout } from "./DashboardLayout";
import { SectionEmptyState } from "../components/SectionEmptyState";
import { CreateFlag } from "../components/CreateFlag";
import { FlagModel } from "../models/FlagModel";
import * as keys from "../config/keys";
import { fetchGet } from "../utils/api";


export const Dashboard: React.FC = (props) => {

    const [flags, setFlags] = useState<FlagModel[]>([]);
    const [refreshFlags, setRefreshFlags] = useState<boolean>(true);

    const handleRefreshFlags = () => {
        setRefreshFlags(!refreshFlags);
    }; 

    useEffect(() => {
        fetchGet('/api/flags').then((res: any) => {
            const allFlags = res.flags.map((item: any) => {
                return {
                    name: item.name,
                    description: item.description,
                    status: item.status,
                    createdOn: item.createdOn, 
                    updatedOn: item.updatedOn
                }
            })
            setFlags(allFlags);
            console.log('🏳️', allFlags);
        })
    }, [refreshFlags]);



    return (
        <DashboardLayout>
            <>
                {flags.length === 0 && <SectionEmptyState type="flags"> <CreateFlag refreshFlagsList={handleRefreshFlags} /> </SectionEmptyState>}
                {flags.length > 0 &&
                    <>
                        <SectionHeader title="Flags"> <CreateFlag refreshFlagsList={handleRefreshFlags} /></SectionHeader>
                        <FlagsList />
                    </>
                }
            </>
        </DashboardLayout>
    );
}