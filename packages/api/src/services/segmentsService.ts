import { SegmentModel, dbManager, ConditionModel } from "@switchfeat/core";

let dataStoreManager: dbManager.DataStoreManager;

export const setDataStoreManager = (manager: Promise<dbManager.DataStoreManager>) => {
    manager.then(data => dataStoreManager = data);
};

export const getSegments = async (): Promise<SegmentModel[]> => {
    return await dataStoreManager.getSegments();
};

export const getSegment = async (search: { id?: string, key?: string }): Promise<SegmentModel | null> => { 
    if (search.id) {
        return await dataStoreManager.getSegmentById(search.id);
    }

    if (search.key) {
        return await dataStoreManager.getSegmentByKey(search.key);
    }

    return null;
};

export const getConditionsBySegment = async (segmentKey: string): Promise<ConditionModel[]> => {
    if (!segmentKey) {
        return [];
    }
    try {
        const segment = await dataStoreManager.getSegmentByKey(segmentKey);
        if (segment && segment.conditions) {
            return segment.conditions;
        }
        return [];
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const addSegment = async (segment: SegmentModel): Promise<boolean> => {
    return await dataStoreManager.addSegment(segment);
};

export const updateSegment = async (segment: SegmentModel): Promise<boolean> => {
    return await dataStoreManager.updateSegment(segment);
};

export const deleteSegment = async (segment: SegmentModel): Promise<boolean> => {
    return await dataStoreManager.deleteSegment(segment);
};