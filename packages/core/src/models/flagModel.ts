import { BaseModel } from './baseModel';
import { SegmentModel } from './segmentModel';

export type FlagModel = {
    key: string; 
    status: boolean;
    segments?: SegmentModel[];
} & BaseModel;