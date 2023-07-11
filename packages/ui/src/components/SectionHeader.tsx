import { ReactNode } from "react";

export const SectionHeader: React.FC<{ title: string, children: ReactNode }> = (props) => {
    return (<>

        <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between px-4 py-5">
            <h3 className="text-lg font-semibold leading-6 text-gray-900"> {props.title}</h3>
            <div className=" sm:ml-4 sm:mt-0">
                {props.children}
            </div>
        </div>
    </>);
};
