/**
 * a class that hold an array of objects that each object would be unique
 *
 */
export declare class ObjectSet {
    private dataArray;
    private dataDict;
    addMany(objects: any[]): void;
    clear(): void;
    add(obj: Record<string, unknown>): this;
    size(): number;
    getAll(): Record<string, unknown>[];
}
//# sourceMappingURL=object-set.d.ts.map