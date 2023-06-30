import { FlagsList } from "../components/FlagsList";
import { SectionHeader } from "../components/SectionHeader";
import { DashboardLayout } from "./DashboardLayout";


export const Dashboard: React.FC = (props) => {
    return (
        <DashboardLayout>
            <>
                <SectionHeader title="Flags" btnAction={ () => {}} btnTitle="Create Flag" />
                <FlagsList />
            </>
        </DashboardLayout>
    );
}