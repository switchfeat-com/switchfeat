import {v4 as uuidv4} from 'uuid';

export const generateGuid = (prefix: string) => {
    const guid = uuidv4();
    return `${prefix}_${guid}`;
  };