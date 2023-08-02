import { BaseModel } from "./BaseModel";

export type SegmentModel = {
    matching: string;
    conditions: ConditionModel[];
} & BaseModel;

export type ConditionModel = {
    key: string;
    operator: string;
    value: string | undefined;
    context: string;
    conditionType: string;
};
