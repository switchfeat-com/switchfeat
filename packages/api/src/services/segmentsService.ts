import { SegmentModel, dbManager } from "@switchfeat/core";

let dataStoreManager: dbManager.DataStoreManager;

export const setDataStoreManager = (manager: Promise<dbManager.DataStoreManager>) => {
    manager.then(data => dataStoreManager = data);
};


export const getSegments = async (segmentId: string): Promise<SegmentModel[]> => {
    return await dataStoreManager.getSegments(segmentId);
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

export const addSegment = async (segment: SegmentModel): Promise<boolean> => {
    return await dataStoreManager.addSegment(segment);
};

export const updateSegment = async (segment: SegmentModel): Promise<boolean> => {
    return await dataStoreManager.updateSegment(segment);
};

export const deleteSegment = async (segment: SegmentModel): Promise<boolean> => {
    return await dataStoreManager.deleteSegment(segment);
};