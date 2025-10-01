type Data<T extends string, K extends string> = {
  str: string[];
  obj: Array<Record<T | K, string>>;
};

export const useExstractId = <T extends string, K extends string>(
  key1: T,
  key2: K
) => {
  function exstract(data: Data<T, K>): string[] {
    const { str, obj } = data;

    const ids = str.map((n) => {
      const userData = obj.find((u) => u[key1] === n);
      return userData ? userData[key2] : "";
    });

    return ids;
  }

  return { exstract };
};
