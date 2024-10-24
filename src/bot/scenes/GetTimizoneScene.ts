// import { Markup } from 'telegraf';
// import { Scene, Hears, SceneEnter, Action, On, Ctx, SceneLeave } from 'nestjs-telegraf';
// import { SceneName } from '../types';
// import { Context } from '@core/types';
//
// @Scene('get_timizone')
// export class GetTimizoneScene {
//     @Action('set_timezone')
//     public async askForTimezone(@Ctx() ctx: Context) {
//         await ctx.reply('Пожалуйста, выберите ваш часовой пояс:', {
//             reply_markup: {
//                 inline_keyboard: [
//                     [{ text: 'Москва (UTC+3)', callback_data: 'timezone_utc3' }],
//                     [{ text: 'Ереван (UTC+4)', callback_data: 'timezone_utc4' }],
//                 ],
//             },
//         });
//     }
//
//     @Action(/timezone_utc\d+/)
//     public async setTimezone(@Ctx() ctx: Context) {
//         const selectedTimezone = ctx.callbackQuery?.data?.split('_')[1];
//         // Сохранение выбранной таймзоны пользователя в базе данных
//         await ctx.reply(`Вы выбрали часовой пояс: UTC+${selectedTimezone}`);
//     }
//
//     @Action('send_location')
//     public async askForLocation(@Ctx() ctx: Context) {
//         await ctx.reply('Пожалуйста, отправьте ваше местоположение для определения вашего часового пояса:', {
//             reply_markup: {
//                 keyboard: [[{ text: 'Отправить моё местоположение', request_location: true }]],
//                 resize_keyboard: true,
//                 one_time_keyboard: true,
//             },
//         });
//     }
//
//     @Action('location_received')
//     public async handleLocation(@Ctx() ctx: Context) {
//         const { location } = ctx.message as any;
//         if (location) {
//             const timezone = await this.determineTimezone(location.latitude, location.longitude);
//             await ctx.reply(`Ваш часовой пояс определён: ${timezone}`);
//         }
//     }
//
//     // Функция определения таймзоны на основе координат
//     private async determineTimezone(latitude: number, longitude: number): Promise<string> {
//         // Логика определения таймзоны по геокоординатам, например, через API Google или другие сервисы
//         return 'UTC+3'; // Пример результата
//     }
//
//     //
//     // @SceneEnter()
//     // public async onSceneEnter(ctx: Context) {
//     //     await ctx.reply('Добро пожаловать', Markup.keyboard([['🌺Начать ретрит']]).resize());
//     // }
//     //
//     // @SceneLeave()
//     // public async onSceneLeave(@Ctx() ctx: Context) {
//     //     await ctx.reply('🌞');
//     // }
//     //
//     // @Action('startRetreat')
//     // @Hears('🌺Начать ретрит')
//     // public async startRetreat(@Ctx() ctx: Context) {
//     //     await ctx.scene.enter(SceneName.CreateRetreat);
//     // }
//     //
//     // @On('text')
//     // public async onText(@Ctx() ctx: Context) {
//     //     await ctx.reply(
//     //         'Жизнь неожиданна прекрасна',
//     //         Markup.inlineKeyboard([Markup.button.callback('🌺Начать ретрит', 'startRetreat')]),
//     //     );
//     //     }
// }
