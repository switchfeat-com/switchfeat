import { BaseModel } from "./baseModel";

export type SdkAuthModel = {
    expiresOn: Date;
    apiKey: string;
} & BaseModel;
