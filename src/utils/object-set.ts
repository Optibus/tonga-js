function chceksum(obj: any): string {
  const str = JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString(16);
}

/**
 * a class that hold an array of objects that each object would be unique
 *
 */
export class ObjectSet {
  private dataArray: Record<string, unknown>[] = [];
  private dataDict: Record<string, unknown> = {};

  addMany(objects: any[]) {
    objects.forEach((obj) => this.add(obj));
  }

  clear() {
    this.dataArray = [];
    this.dataDict = {};
  }

  add(obj: Record<string, unknown>) {
    const key = chceksum(obj);
    if (!this.dataDict[key]) {
      this.dataDict[key] = obj;
      this.dataArray.push(obj);
    }
    return this;
  }

  size(): number {
    return this.dataArray.length;
  }

  getAll() {
    return this.dataArray;
  }
}
