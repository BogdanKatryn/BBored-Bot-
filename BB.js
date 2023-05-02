const TelegramBot = require('node-telegram-bot-api');
const token = "6267439042:AAGJrEIqqSS7RiLEdmQhgB6_kAJNnn-ccsA";
const bot   = new TelegramBot(token, {polling : true});

bot.onText(/\echo (.+)/, (msg, macth) => {

   const chatId = msg.chat.id;
   const resp   = match[1];
   
   bot.sendMessage(chatId, resp);
   
});

bot.on('message', (msg) => {

   console.log(msg)
   const chatId = msg.chat.id;

   const userName = msg.from.first_name;
   bot.sendMessage(chatId, "Здраствуй, " + userName + "!\nДобро пожаловать к BB! \nЕсли ты чувствуешь себя в последнее время как этот котик, то этот бот для тебя ;) Жмякай ниже по кнопочке что бы узнать что он умеет.");
   //bot send any message 
   
   bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/9.webp');
   //bot send sticker through URL

});
