// import { Markup } from 'telegraf';
// import { v4 as uuid } from 'uuid';
// import { Scene, Hears, SceneEnter, Ctx, On, SceneLeave, Command, Message } from 'nestjs-telegraf';
//
// import { Context } from '@core/types';
// import { SceneName } from '../types';
// import { DateFormat, DateHelper } from '@utils/DateHelper';
// import { isDefined } from '@utils/isDefined';
// import { Inject } from 'typescript-ioc';
// import { IUserHandlers } from '../interfaces/IUserHandlers';
// import { IRetreatHandlers } from '../interfaces/IRetreatHandlers';
//
// @Scene(SceneName.MeetingCreating)
// export class CreateRetreatScene {
//     @Inject private userHandlers!: IUserHandlers;
//     @Inject private retreatHandlers!: IRetreatHandlers;
//
//     @SceneEnter()
//     public async onSceneEnter(ctx: Context) {
//         await ctx.reply(
//             'Введите дату начала в формате ДД.ММ.ГГГГ \nПример: 01.08.2034',
//             Markup.keyboard([['🔙Вернуться']]).resize(),
//         );
//     }
//
//     @SceneLeave()
//     public async onSceneLeave(@Ctx() ctx: Context) {
//         await ctx.reply('Bye Bye 👋');
//     }
//
//     @Command('leave')
//     @Hears('🔙Вернуться')
//     public async goBack(@Ctx() ctx: Context) {
//         await ctx.scene.enter(SceneName.Main);
//     }
//
//     @On('text')
//     public async setStartDate(@Ctx() ctx: Context, @Message('text') reversedText: string) {
// const startDate = DateHelper.createDate(reversedText, DateFormat.DateWithDotSeparator);
//
//         if (startDate.toString() === 'Invalid Date') {
//             await ctx.reply('Введите дату начала в формате ДД.ММ.ГГГГ \nПример: 01.08.2034');
//         } else if (DateHelper.isBefore(startDate, new Date())) {
//             await ctx.reply('Дата должна быть в будущем');
//         } else {
//             if (isDefined(ctx.from)) {
//                 await this.userHandlers.createIfNotExist({
//                     ifNotExist: true,
//                     id: uuid(),
//                     chatId: ctx.from.id,
//                     firstName: ctx.from.first_name,
//                     lastName: ctx.from.last_name || '',
//                 });
//                 await this.retreatHandlers.create({
//                     startDate,
//                     id: uuid(),
//                     chatId: ctx.from.id,
//                 });
//             }
//
//             await ctx.reply(`${reversedText} придет напонминаие!`);
//         }
//     }
// }
