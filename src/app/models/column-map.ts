export class ColumnMap {
  primaryKey: string;
  private headerData: string;
  private formatData: string;
  alternativeKeys?: any[];
  specialKeys?: any[];

  constructor(settings: any) {
    this.primaryKey = settings.primaryKey;
    this.header = settings.header;
    this.format = settings.format;
    this.alternativeKeys = settings.alternativeKeys;
    this.specialKeys = settings.specialKeys;
  }

  set header(setting: string) {
    this.headerData = setting
      ? setting
      : this.primaryKey.slice(0, 1).toUpperCase() +
        this.primaryKey.replace(/_/g, ' ').slice(1);
  }

  get header() {
    return this.headerData;
  }

  set format(setting: string) {
    this.formatData = setting ? setting : 'default';
  }

  get specialKeysArray() {
    return this.headerData;
  }

  set specialKeysArray(setting: string) {
    this.formatData = setting ? setting : "default";
  }

  get format() {
    return this.formatData;
  }

  access = function(object: any) {
    if (object[this.primaryKey] || !this.alternativeKeys) {
      return this.primaryKey;
    }
    for (const key of this.alternativeKeys) {
      if (object[key]) {
        return key;
      }
    }
    return this.primaryKey;
  };
}
