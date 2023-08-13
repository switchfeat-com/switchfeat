import React from "react";
import Sidebar from "../components/shared/Sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex w-screen bg-[#F9FAFB]">
            <aside className="pl-2 py-2 w-60 h-screen">
                <div className="pl-2 pt-10 rounded-2xl bg-white h-full">
                    <Sidebar />
                </div>
            </aside>
            <div className="w-[calc(100vw_-_240px)] p-6 max-w-6xl mx-auto">
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
