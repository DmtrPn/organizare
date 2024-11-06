import { describe, before, it, beforeEach } from 'node:test';
type TestFunction = () => Promise<void> | void;

interface TestOptions {
    description?: string;
    only?: boolean;
    skip?: boolean;
}

function Describe(description?: string) {
    return function (constructor: Function) {
        describe(description ?? constructor.name, () => {
            const instance = new (constructor as any)();
            const prototype = Object.getPrototypeOf(instance);

            const testMethods = Object.getOwnPropertyNames(prototype)
                .map(key => prototype[key])
                .filter(method => method && method.isTest);

            // Если есть хотя бы один тест с флагом `only`, запускаем только его
            const hasOnlyTests = testMethods.some((method: any) => method.only);

            for (const method of testMethods) {
                const testName = method.description || method.name;
                if (hasOnlyTests) {
                    // Запускаем только тесты с флагом `only`
                    if (method.only) {
                        it(testName, method.bind(instance));
                    }
                } else if (method.skip) {
                    // Пропускаем тесты с флагом `skip`
                    it.skip(testName, method.bind(instance));
                } else {
                    // Обычные тесты
                    it(testName, method.bind(instance));
                }
            }
        });
    };
}

function Test(params: TestOptions | string) {
    const {
        description,
        only = false,
        skip = false,
    } = (params instanceof String ? ({ description: params } as TestOptions) : params) as TestOptions;
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value as TestFunction & TestOptions & { isTest: boolean };
        originalMethod.isTest = true;
        originalMethod.description = description || propertyKey;
        originalMethod.only = only;
        originalMethod.skip = skip;
    };
}

function BeforeAll() {
    return function (target: any, propertyKey: string) {
        // Используем `before` для вызова метода до всех тестов
        before(async () => {
            // Здесь мы вызываем метод, используя контекст класса `target`
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}

function BeforeEach() {
    return function (target: any, propertyKey: string) {
        // Используем `before` для вызова метода до всех тестов
        beforeEach(async () => {
            // Здесь мы вызываем метод, используя контекст класса `target`
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}

export { Describe, Test, BeforeAll, BeforeEach };
