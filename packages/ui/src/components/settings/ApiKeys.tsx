import { FC } from "react";
import { Settings } from "../../pages/Settings";
import { useApiKeys } from "./hooks";
import { SdkAuthModel } from "../../models/SdkAuthModel";

export const ApiKeys: FC = () => {

    const { sdkAuths } = useApiKeys();

    return (
        <Settings>
            <>
                {sdkAuths.map((x: SdkAuthModel, idx: number) => (
                    <>
                        <div key={idx}>{x.name}</div>
                        <div key={idx}>{x.description}</div>
                        <div key={idx}>{x.expiresOn}</div>
                        <div key={idx}>{x.createdOn}</div>
                    </>
                ))}
            </>
        </Settings>
    );
};