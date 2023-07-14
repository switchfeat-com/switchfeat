import {v4 as uuidv4} from 'uuid';


export const generateKey = (val: string) => {
    return val.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  export const generateGuid = (prefix: string) => {
    const guid = uuidv4();
    return `${prefix}_${guid}`;
  };