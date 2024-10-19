interface Params<B> {
    body: B;
}

export abstract class DomainEvent<B> {
    public body: B;

    public constructor({ body }: Params<B>) {
        this.body = body;
    }
}
