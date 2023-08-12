import { BaseModel } from "./baseModel";
import { ConditionModel } from "./conditionModel";

export type SegmentMatching = "all" | "any";

export type SegmentModel = {
    conditions?: ConditionModel[];
    matching: SegmentMatching;
} & BaseModel;
