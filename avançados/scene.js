const env = require('../.env')
const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Scene = require('telegraf/scenes/base')
const { enter, leave } = Stage
const bot = new Telegraf(env.token)

bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}`)
    await ctx.reply(`Entre com /echo ou /soma para iniciar...`)
})

const echoScene = new Scene('echo')
echoScene.enter(ctx => ctx.reply('Entrando no Echo'))
echoScene.leave(ctx => ctx.reply('Saindo de Echo'))
echoScene.command('sair', leave())
echoScene.on('text', ctx => ctx.reply(ctx.message.text))
echoScene.on('message', ctx => ctx.reply('Apenas mensagens de texto, por favor.'))

let sum = 0

const sumScene = new Scene('sum')
sumScene.enter(ctx => ctx.reply('Entrando em Sum'))
sumScene.leave(ctx => ctx.reply('Saindo de Sum'))

sumScene.use(async (ctx, next) => {
    await ctx.reply('Você está em Sum Scene, escreva valores para serem somados')
    await ctx.reply('Outros comandos: /zerar /sair')
    next()
})

sumScene.command('zerar', ctx => {
    sum = 0
    ctx.reply(`Valor: ${sum}`)
})

sumScene.command('sair', leave())

sumScene.hears(/(\d+)/, ctx => {
    sum += parseInt(ctx.match[1])
    ctx.reply(`Valor: ${sum}`)
})

sumScene.on('message', ctx => ctx.reply('Apenas números, por favor.'))

const stage = new Stage([echoScene, sumScene])
bot.use(session())
bot.use(stage.middleware())
bot.command('soma', enter('sum'))
bot.command('echo', enter('echo'))
bot.on('message', ctx => ctx.reply('Entre com /echo ou /soma para iniciar...'))

bot.startPolling()