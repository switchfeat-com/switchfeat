import React, { useState } from "react";
import Sidebar from "../components/shared/Sidebar";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/20/solid";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [sidebar, setSidebar] = useState<boolean>(false);
    return (
        <div className="flex w-screen bg-[#F9FAFB]">
            <Bars3Icon
                className="w-6 h-6 absolute top-4 left-4 cursor-pointer text-[#2563EB] block md:hidden"
                onClick={() => setSidebar(!sidebar)}
            />
            <aside
                className={`pl-2 py-2 w-60 h-screen z-50 ${
                    sidebar ? "block fixed top-0" : "hidden"
                } md:block`}
            >
                <div className="pl-2 pt-10 rounded-2xl bg-white h-full relative">
                    {sidebar ? (
                        <XMarkIcon
                            className="w-4 absolute top-5 cursor-pointer right-3"
                            onClick={() => setSidebar(false)}
                        />
                    ) : (
                        ""
                    )}
                    <Sidebar />
                </div>
            </aside>
            <div
                className={`w-screen md:w-[calc(100vw_-_240px)] p-6 max-w-6xl mx-auto pt-16 md:pt-6 ${
                    sidebar ? "opacity-10" : ""
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;
