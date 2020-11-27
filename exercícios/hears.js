const env = require('../.env')
const Telegraf = require('telegraf')
const momnet = require('moment')
const bot = new Telegraf(env.token)

bot.hears('pizza', ctx => ctx.reply('Quero!'))

bot.hears(['fígado', 'chuchu'], ctx => ctx.reply('Passo'))
bot.hears(/burguer/i, ctx => ctx.reply('Quero!')) // Expressão regular
bot.startPolling() 