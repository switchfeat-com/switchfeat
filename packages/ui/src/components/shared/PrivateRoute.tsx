import { ReactElement } from "react";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContextProvider";
import DashboardLayout from "../../layout/DashboardLayout";

const PrivateRoute: React.FC<{ children: ReactElement }> = ({ children }) => {
    const { authContext } = useAppContext();

    return !(authContext.userData?.authenticated as boolean) ? (
        <Navigate replace to={"/unauthorized"} />
    ) : (
        <DashboardLayout>{children}</DashboardLayout>
    );
};

export default PrivateRoute;
