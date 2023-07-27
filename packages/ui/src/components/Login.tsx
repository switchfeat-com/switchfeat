import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContextProvider";
import logo from "../images/logo.png";

export const Login: React.FC = () => {
  const { authContext } = useAppContext();
  const navigateTo = useNavigate();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img className="mx-auto h-20 w-20" src={logo} alt="SwitchFeat" />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to SwitchFeat
            </h2>
          </div>

          {!(authContext.userData?.authenticated as boolean) ? (
            <div className="mt-20 flex flex-col gap-4 ">
              <button
                onClick={() => {
                  authContext.loginClick("google");
                }}
                className="flex w-full items-center justify-center gap-3 rounded-md
                                  bg-blue-500 px-4 py-2 text-white
                                  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                                   focus-visible:outline-[#1D9BF0] hover:bg-blue-600"
              >
                <svg
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 488 512"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  />
                </svg>
                <span className="text-base font-semibold leading-6">
                  Login with Google
                </span>
              </button>
            </div>
          ) : (
            <div className="mt-20 flex flex-col gap-4 ">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-green-800">
                      No authentication provider configured
                    </h3>
                    <div className="mt-2 text-base text-green-700">
                      <p>
                        To add the authentication step, please follow the
                        documentation.
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="-mx-2 -my-1.5 flex">
                        <a
                          href="https://docs.switchfeat.com"
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md bg-green-50 px-2 py-1.5 text-base font-medium text-green-800
                                                     hover:bg-green-100 focus:outline-none focus:ring-2
                                                     focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
                        >
                          View documentation{" "}
                          <span aria-hidden="true"> &rarr;</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  navigateTo("/dashboard");
                }}
                className="flex w-full items-center justify-center gap-3 rounded-md mt-5
                              bg-green-500 px-4 py-2 text-white
                              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                               focus-visible:outline-green-400 hover:bg-green-600"
              >
                <span className="text-base font-semibold leading-6">
                  Go to Dashboard
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
