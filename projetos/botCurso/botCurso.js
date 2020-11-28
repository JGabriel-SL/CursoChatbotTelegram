const env = require('../../.env')
const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const axios = require('axios')
const bot = new Telegraf(env.token)

const tecladoOpcoes = Markup.keyboard([
    ['O que são bots?', 'O que verei no curso?'],
    ['Posso mesmo automatizar tarefas?'],
    ['Como comprar o curso?']
]).resize().extra()

const botoes = Extra.markup(
    Markup.inlineKeyboard([
        Markup.callbackButton('Sim', 's'),
        Markup.callbackButton('Não', 'n')
    ], {columns: 2})
)
    
const localizacao = Markup.keyboard([
    Markup.locationRequestButton('Clique aqui para enviar sua localização!')
]).resize().oneTime().extra()

bot.start( async ctx => {
    const nome = ctx.update.message.from.first_name
    await ctx.replyWithMarkdown(`*Olá, ${nome}!* Eu sou o Chatbot do curso`)
    await ctx.replyWithPhoto('https://files.cod3r.com.br/curso-bot/bot.png')
    await ctx.replyWithMarkdown(`_Posso te ajudar em algo?_`, tecladoOpcoes)
})

bot.hears('O que são bots?', async ctx => {
    await ctx.reply('Bot é popopopipipipopopo')
    await ctx.replyWithMarkdown(`\n_Algo mais?_`, tecladoOpcoes)
})

bot.hears('O que verei no curso?', async ctx => {
    await ctx.reply('Você irá desenvolver 3 projetos :')
    await ctx.reply('1. Um bot para automatizar uma lista de compras')
    await ctx.reply('2. Um bot para cadastrar eventos')
    await ctx.reply('3. Um bot para o curso')
    await ctx.reply('Você poderá criar uma cópia minha!!')
    await ctx.replyWithMarkdown(`\n_Algo mais?_`, tecladoOpcoes)
})

bot.hears('Posso mesmo automatizar tarefas?',async ctx => {
    await ctx.reply('Claro! Quer ver?', botoes)
})

bot.hears('Como comprar o curso?', async ctx => {
    await ctx.replyWithMarkdown('Aqui [link](https://www.cod3r.com.br/)')
    await ctx.replyWithMarkdown(`\n_Algo mais?_`, tecladoOpcoes)
})

bot.action('s', async ctx => {
    await ctx.reply('Mande sua localização ou mande qualquer mensagem!', localizacao)
})

bot.action('n', async ctx => {
    await ctx.reply('Ok, não precisa ser grosso! :(', tecladoOpcoes)
})

bot.hears(/qualquer mensagem/i, async ctx => {
    await ctx.reply('Essa piada é velha, tente outra...', tecladoOpcoes)
})

bot.on('text', async ctx => {
    let msg = ctx.message.text
    msg = msg.split('').reverse().join('')
    await ctx.reply(`Sua mensagem ao contrário : ${msg}`, tecladoOpcoes)
})

bot.on('location', async ctx => {
    try {
        const url = 'api.openweathermap.org/data/2.5/weather'
        console.log('oi')
        const { latitude : lat, longitude: lon} = ctx.message.location
        console.log(lat + ' ' + lon)
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=fd1f60192d9ad3370815cceef07ed3b0`)
        console.log('oi3')
        await ctx.reply('res')
        await ctx.reply(`Hum... Você está em ${res.data.name}`)
        const temp = await (res.data.main.temp - 273.15)
        await ctx.reply(`A temperatura por ai é de ${temp}°C`, tecladoOpcoes)
    } catch (e) {
        ctx.reply(`Erro : ${e}`, tecladoOpcoes)
    }
})

bot.startPolling()