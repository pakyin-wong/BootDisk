namespace we {
  export namespace utils {
    export class EnumHelpers {
      private constructor() {}

      public static keys(enumType: any): string[] {
        return Object.keys(enumType);
      }

      public static values(enumType: any): string[] {
        const keys = Object.keys(enumType);
        return keys.map(key => enumType[key]);
      }

      public static getKeyByValue(enumType: any, value: number): string {
        const keys: string[] = Object.keys(enumType);
        for (const key of keys) {
          if (enumType[key] === value) {
            return key;
          }
        }
        return null;
      }
    }
  }
}
