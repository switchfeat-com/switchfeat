
export const generateKey = (val: string) => {
    return val.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };