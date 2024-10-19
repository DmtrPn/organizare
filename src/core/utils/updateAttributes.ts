export function updateAttributes<P extends object>(it: P, params: Partial<P>): void {
    Object.keys(params).forEach(key => {
        const k = key as keyof P;
        it[k] = params[k] ?? it[k];
    });
}
