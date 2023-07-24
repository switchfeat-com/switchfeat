import {v4 as uuidv4} from 'uuid';


export const generateSlug = (val: string) => {
    return val.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  export const generateGuid = (prefix?: string) => {
    const guid = uuidv4();
    const prefixVal = prefix ? prefix + "_" : "";
    return `${prefixVal}${guid}`;
  };