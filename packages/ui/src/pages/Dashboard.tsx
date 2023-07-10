import { DashboardLayout } from "../layout/DashboardLayout";
import logo from "../images/logo.png";
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {

    const navigate = useNavigate();

    return (
        <DashboardLayout>


            <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">

                        <div className="sm:mx-auto sm:w-full sm:max-w-md">

                            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                                <img
                                    className="mx-auto h-20 w-20"
                                    src={logo}
                                    alt="SwitchFeat"
                                />
                                <h2 className="mt-6 text-center text-xl   leading-9 tracking-tight text-gray-900">
                                    SwitchFeat Dashboard (WIP)
                                </h2>

                                <div className="mx-auto flex justify-center mt-4">
                                <button
                                    onClick={() => navigate("/flags")}
                                    type="button"
                                    className="  items-center rounded-md border  
                                                border-transparent bg-emerald-500 px-3 py-2 
                                                text-base font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                >

                                    Start from Flags
                                </button>
                                </div>
                               
                            </div>


                        </div></div></div></div>
        </DashboardLayout>);
}