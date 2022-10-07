export abstract class Serializable<T> {
  protected abstract create(data?: any): T;

  toDatabaseObj<T extends Serializable<T>>(this: T) {
    const data: { [k: string]: any } = {};
    for (const [key, value] of Object.entries(this)) {
      if (key === "id") continue; // [Do not create id on document]
      if (value instanceof Serializable) {
        data[key] = value.toJson();
      } else if (value !== "undefined") {
        data[key] = value;
      }
    }
    return data;
  }

  toJson<T extends Serializable<T>>(this: T) {
    const data: { [k: string]: any } = {};
    for (const [key, value] of Object.entries(this)) {
      if (value instanceof Serializable) {
        data[key] = value.toJson();
      } else if (value !== "undefined") {
        data[key] = value;
      }
    }
    return data;
  }

  toFullJson<T extends Serializable<T>>(this: T) {
    const data: { [k: string]: any } = {};
    for (const [key, value] of Object.entries(this)) {
      if (value instanceof Serializable) {
        data[key] = value.toJson();
      } else if (value instanceof Date) {
        data[key] = value.getTime();
      } else if (value !== "undefined") {
        data[key] = value;
      }
    }
    return data;
  }

  fromJson<T extends Serializable<T>>(this: T, data?: { [k: string]: any }) {
    const newData: { [k: string]: any } = {};
    const originalEntries = Object.entries(this);
    for (const [key, value] of Object.entries(data ?? {})) {
      const initialEntry = originalEntries.find(([k]) => k === key);
      if (initialEntry) {
        const initialValue = initialEntry[1];
        if (initialValue instanceof Serializable) {
          newData[key] = initialValue.fromJson(value);
        } else if (initialValue instanceof Date) {
          newData[key] = new Date(value);
        } else if (value !== "undefined") newData[key] = value;
      }
    }
    return this.create(newData);
  }
}
