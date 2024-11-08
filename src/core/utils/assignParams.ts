export function assignParams<T extends Record<string, any>, U extends Partial<Record<keyof T, any>>>(
    it: T,
    params: U,
): void {
    Object.keys(params).forEach(key => {
        if (key in it) {
            (it as any)[key] = params[key]!;
        }
    });
}
