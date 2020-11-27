const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const session = require('telegraf/session')
const { markup } = require('telegraf/extra')
const bot = new Telegraf(env.token)

const botoes = lista => Extra.markup(
    Markup.inlineKeyboard(
        lista.map(item => Markup.callbackButton(item, `delete ${item}`)),
        { columns: 3}
    )
)

bot.use(session())

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}!`)
    await ctx.reply('Digite os itens que você deseja adicionar a lista!')
    ctx.session.lista = []
})

bot.on('text', ctx => {
    let msg = ctx.update.message.text
    ctx.session.lista.push(msg)
    ctx.reply(`${msg} foi adicionado a lista!`, botoes(ctx.session.lista))
})

bot.action(/delete (.+)/, ctx => {
    ctx.session.lista = ctx.session.lista.filter(item => item !== ctx.match[1])
    ctx.reply(`${ctx.match[1]} foi removido da lista...`, botoes(ctx.session.lista))
})

bot.startPolling()