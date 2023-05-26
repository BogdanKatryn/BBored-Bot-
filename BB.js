const TelegramBot = require('node-telegram-bot-api');
const token = "6267439042:AAGJrEIqqSS7RiLEdmQhgB6_kAJNnn-ccsA";
const bot   = new TelegramBot(token, {polling : true});

const start = () =>{
   const info_options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Info', callback_data: 'Info must be here'}]
        ]
      })
    };
   
   bot.setMyCommands([
      {command: '/start', description: "Приветствие"},
      {command: '/info', description: "Информация"},
      {command: '/bored', description: "Основная програма"},
   ]);
   
   
   
   bot.on('callback_query', msg=>{
      
      const data = msg.data;
      const chatId = msg.message.chat.id;
   
      bot.sendMessage(chatId, `${data}`);
   
      console.log(msg);
   });
   
   bot.onText(/\echo (.+)/, (msg, macth) => {
   
      const chatId = msg.chat.id;
      const resp   = match[1];
      
      bot.sendMessage(chatId, resp);
      
   });


bot.on('message', async msg => {

   console.log(msg)
   const text = msg.text;
   const chatId = msg.chat.id;
   const userName = msg.from.first_name;
      
   
      if (text === '/start'){      
         await bot.sendMessage(chatId, "Здраствуй, " + userName + "!\nДобро пожаловать к BB! \nЕсли ты чувствуешь себя в последнее время как этот котик, то этот бот для тебя ;) Жмякай ниже по кнопочке что бы узнать что он умеет.", info_options);
         //bot send any message 
      
         return bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/9.webp');
         //bot send sticker through URL
        
      }; 

      if (text === '/info'){
         return bot.sendMessage(chatId, "Information");
      };
      
      if (text === '/bored'){
         return bot.sendMessage(chatId, "Connecting to API");
      };
      





   return bot.sendMessage(chatId,"A?");
   });     
};

start()