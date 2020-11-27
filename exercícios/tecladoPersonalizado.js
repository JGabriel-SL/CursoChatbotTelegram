const env = require('../.env')
const Telegraf = require('telegraf')
const Markup = require('telegraf/markup')
const bot = new Telegraf(env.token)

const tecladoCarne = Markup.keyboard([
    ['🍛 arroz com curry', '🍤 camarão frito'],
    ['🍬 bala', '🍪 biscoito', '🥧 torta'],
    ['🍿 pipoca', '🍖 carne']
]).resize().extra()

bot.start(async ctx => {
    await ctx.reply(`Seja bem vindo, ${ctx.update.message.from.first_name}!`)
    await ctx.reply(`Qual bebida você prefere?`, 
        Markup.keyboard(['Coca', 'Pepsi']).resize().oneTime().extra())
    
})

bot.hears(['Coca', 'Pepsi'], async ctx => {
    await ctx.reply(`Boa escolha! ${ctx.match}`)
    await ctx.reply(`Qual a sua comida favorita? `, tecladoCarne)
})

bot.hears(['🍛 arroz com curry', '🍤 camarão frito'], ctx => ctx.reply('Amo essa escolha!'))
bot.hears('🥧 torta', ctx => ctx.reply('Muito bom gosto!'))
bot.on('text', ctx => ctx.reply('Que ótimo! Anotado'))

bot.startPolling()