const env = require('../.env')
const Telegraf = require('telegraf')

const bot = new Telegraf(env.token)

bot.start(ctx => {
    const from = ctx.update.message.from
    const id = ctx.update.message.from.id
    if (id == '1436362997') {
        ctx.reply('Ao seu dispor, mestre')
    } else {
        ctx.reply('Sinto muito, mas eu só falo com meu mestre')
    }
})

bot.startPolling()