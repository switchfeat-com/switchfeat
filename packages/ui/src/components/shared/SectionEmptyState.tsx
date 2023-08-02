import { FolderPlusIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

export const SectionEmptyState: React.FC<{
    type: string;
    children: ReactNode;
}> = (props) => {
    return (
        <div className="text-center border-4 border-dashed p-10 m-10">
            <FolderPlusIcon className="h-10 w-10 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
                {`No ${props.type}`}
            </h3>
            <p className="mt-1 text-base text-gray-500">
                {props.type === "flags" &&
                    `Get started by creating a new feature flag.`}
                {props.type === "segments" &&
                    `Get started by creating a new user segment.`}
                {props.type === "conditions" &&
                    `Get started by creating a new condition.`}
            </p>
            <div className="mt-6">{props.children}</div>
        </div>
    );
};
