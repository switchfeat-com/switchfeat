import { BaseModel } from "./BaseModel";
import { SegmentModel } from "./SegmentModel";

export type FlagModel = {
    status: boolean;
    rules: RuleModel[];
} & BaseModel;

export type RuleModel = {
    key: string;
    segment: SegmentModel;
};