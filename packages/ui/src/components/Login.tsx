import { useAppContext } from "../context/AppContextProvider";
import logo from "../images/logo.png";



export const Login: React.FC = () => {

    const appContext = useAppContext();

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">


            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">

                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <img
                            className="mx-auto h-20 w-20"
                            src={logo}
                            alt="SwitchFeat"
                        />
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to SwitchFeat
                        </h2>
                    </div>
                    <div className="mt-20 flex flex-col gap-4 ">
                        <button
                            onClick={() => appContext.authContext.loginClick("google")}
                            className="flex w-full items-center justify-center gap-3 rounded-md
                                 bg-blue-500 px-3 py-1.5 text-white 
                                 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                  focus-visible:outline-[#1D9BF0] hover:bg-blue-600"
                        >
                            <svg className="h-5 w-5 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 488 512">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                            <span className="text-sm font-semibold leading-6">Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

