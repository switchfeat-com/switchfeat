import { BaseModel } from "./BaseModel";

export type SdkAuthModel = {
    expiresOn: string;
    apiKey: string;
} & BaseModel;