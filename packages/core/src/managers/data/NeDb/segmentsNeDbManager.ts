import { SegmentModel } from "../../../models/segmentModel";
import { NeDbManager } from "../dbManager";

let neDbManager: NeDbManager;

export const setNeDbManager = (neDbGlobalManager: NeDbManager) => {
    neDbManager = neDbGlobalManager;
};

export const getSegments = async (flagKey: string): Promise<SegmentModel[]> => neDbManager.segments!.asyncFind({ "flagKey": flagKey });

export const getSegmentById = async (id: string): Promise<SegmentModel> => neDbManager.segments!.asyncFindOne({
    _id: id,
});

export const getSegmentByKey = async (key: string): Promise<SegmentModel> => neDbManager.segments!.asyncFindOne({
    "key": key,
});

export const addSegment = async (segment: SegmentModel): Promise<boolean> => {
    try {
        const response = await neDbManager.segments!.asyncInsert(segment);
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const updateSegment = async (segment: SegmentModel): Promise<boolean> => {
    try {
        const response = await neDbManager.segments!.asyncUpdate({ _id: segment._id }, {
            $set: {
                description: segment.description,
                name: segment.name,

            } as SegmentModel
        });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};

export const deleteSegment = async (segment: SegmentModel): Promise<boolean> => {
    try {
        const response = await neDbManager.segments!.asyncRemove({ _id: segment._id });
        return (!!response);
    } catch (ex) {
        console.error(ex);
        return false;
    }
};