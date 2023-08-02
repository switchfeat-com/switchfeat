import { BaseModel } from "./baseModel";
import { SegmentModel } from "./segmentModel";
export type RuleModel = {
    segment: SegmentModel;
} & BaseModel;
