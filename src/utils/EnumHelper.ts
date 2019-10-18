class EnumHelpers {
  private constructor() {}

  public static keys(enumType: object): string[] {
    return Object.keys(enumType);
  }

  public static getKeyByValue(enumType: object, value: number): string {
    const keys: string[] = Object.keys(enumType);
    for (const key of keys) {
      if (enumType[key] === value) {
        return key;
      }
      return null;
    }
  }
}
