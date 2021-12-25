const { Telegraf } = require('telegraf')
const bot = new Telegraf('5084142092:AAGAbpsLkFtH8DRvbsW54FAw6rl7OTqTvWo') 
const covidApi = require('covid19-api')
bot.start( ctx => ctx.reply(`
   Welcome
`))

bot.on('text', async (ctx) => {
   try {
       const userText = ctx.message.text
       const covidData = await covidApi.getReportsByCountries(userText)
       const countryData = covidData[0][0]
       const formatData = `Cases: ${countryData.cases},
                           Deaths: ${countryData.deaths},
                           Recovered: ${countryData.recovered}`
       ctx.reply(formatData)
   } catch(e) {
       ctx.reply('Invalid country')
   }
})
bot.launch() 