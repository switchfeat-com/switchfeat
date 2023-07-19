import { SegmentModel } from "./SegmentModel";

export type FlagModel = {
    name: string;
    description?: string;
    createdOn: string;
    updatedOn: string;
    status: boolean;
    key: string;
    rules: RuleModel[];
};

export type RuleModel = {
    key: string;
    segment: SegmentModel;
};