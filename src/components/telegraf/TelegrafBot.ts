import { Telegraf } from 'telegraf';

export class TelegrafBot {
    private static instance: Telegraf;

    public static getInstance(): Telegraf {
        if (!this.instance) {
            this.instance = new Telegraf(process.env.TB_TOKEN!);
        }

        return this.instance;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
}
