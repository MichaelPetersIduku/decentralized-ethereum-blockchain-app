export class Utils {
  public static cleanObject(object: Object): Object {
    const filteredObj = Object.keys(object).reduce((acc, key) => {
      if (object[key] !== undefined) {
        acc[key] = object[key];
      }
      return acc;
    }, {});

    return filteredObj;
  }
}
