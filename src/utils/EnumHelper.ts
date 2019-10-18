class EnumHelpers {
  private constructor() {}

  public static keys(enumType: any): string[] {
    return Object.keys(enumType);
  }

  public static getKeyByValue(enumType: any, value: number): string {
    const keys: string[] = Object.keys(enumType);
    for (const key of keys) {
      if (enumType[key] === value) {
        return key;
      }
      return null;
    }
  }
}
