const TelegramBot = require('node-telegram-bot-api');             // Підключення модуля 'node-telegram-bot-api'
const token = "6267439042:AAGJrEIqqSS7RiLEdmQhgB6_kAJNnn-ccsA";   // Токен вашого бота
const bot   = new TelegramBot(token, {polling : true});           // Створення об'єкту бота з використанням токена і параметром polling

   const start = () =>{                                           // Функція start, яка виконується при запуску бота
   let activity = '';                                             // Змінна для зберігання поточного завдання
   const info_options = {                                         // Налаштування клавіатури для команди /info
      reply_markup: JSON.stringify({
        keyboard: [
          [{ text: 'Info'}]
        ]
      })
   };
   
   bot.setMyCommands([                                            // Установка користувальницьких команд для робота
      {command: '/start', description: "Greetings"},
      {command: '/info', description: "Information"},
      {command: '/bored', description: "Bored"},
   ]);
   
   bot.onText(/\echo (.+)/, (msg, macth) => {                     // Обробка команди /еcho
      const chatId = msg.chat.id;                                 // Отримання ідентифікатора чату
      const resp   = match[1];                                    // Отримання тексту після команди /echo
      
      bot.sendMessage(chatId, resp);                              // Відправлення повідомлення у відповідь з текстом після команди /echo
   });

   bot.on('message', async msg => {                               // Обробка решти повідомлень
      const text = msg.text;                                      // Отримання тексту повідомлення
      const chatId = msg.chat.id;                                 // Отримання ідентифікатора чату
      const userName = msg.from.first_name;                       // Отримання імені користувача
      const axiosRequest = require('axios')                       // Підключення модуля axios для надсилання HTTP-запитів
      console.log(msg)                                            // Виведення інформації про повідомлення в консоль

         if (text === '/start'){                                  // Обробка команди /start
            await bot.sendMessage(chatId, "Hello " + userName + "!\nWelcome to BB! \nIf you recently feel like this cat, then this bot is for you;) Click the button below to find out what he can do.", info_options);
            // Надсилання вітального повідомлення з клавіатурою 
         
            return bot.sendSticker(chatId, 'https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/192/9.webp');
            // Відправлення стікера з котиком
         }; 

         if (text === '/info' || text === 'Info'){                // Обробка команди /info або тексту 'Info'
            const bored = {                                       // Налаштування клавіатури для команди /bored
               reply_markup: JSON.stringify({
                  keyboard: [
                     [{ text: 'Bored', callback_data: 'repeat' }]
                  ]
               })
            };
            return bot.sendMessage(chatId, 'This bot is designed for those who are bored and don`t know what to do with themselves.' + '\nThe bot generates random tasks. To start, press the button or type /bored', bored);
            // Надсилання інформаційного повідомлення з клавіатурою для команди /bored 
         };

         if (text === '/bored' || text === 'Bored'){              // Обробка команди /bored або тексту 'Bored'
            const bored = {                                       // Налаштування клавіатури для команди 'One more!'
               reply_markup: JSON.stringify({
                  keyboard: [
                     [{ text: 'One more!', callback_data: 'repeat' }]
                  ]
               })
            };
            async function getRandomActivity() {                  // Функція отримання випадкової активності
               let response = await axiosRequest.get('http://www.boredapi.com/api/activity/');
               // Надсилання GET-запиту до API для отримання випадкової активності
               activity = response.data.activity;                 // Отримання активності з відповіді API    
               bot.sendMessage(chatId, activity, bored);          // Надсилання повідомлення з активністю та клавіатурою для команди 'One more!'
            }
         
            getRandomActivity();                                  // Виклик функції отримання випадкової активності
         };

         if (text === 'One more!'){                               // Обробка тексту 'One more!'
            const bored_repeat = {                                // Налаштування клавіатури для команди 'One more!'
               reply_markup: JSON.stringify({
                  keyboard: [
                     [{ text: 'One more!', callback_data: 'repeat' }]
                  ]
               })
            };
            async function getRandomActivity() {                  // Функція отримання випадкової активності
               let response = await axiosRequest.get('http://www.boredapi.com/api/activity/');
               // Надсилання GET-запиту до API для отримання випадкової активності
               activity = response.data.activity;                 // Отримання активності з відповіді API
               bot.sendMessage(chatId, activity, bored_repeat);   // Надсилання повідомлення з активністю та клавіатурою для команди 'One more!'
            }
            getRandomActivity();                                  // Виклик функції отримання випадкової активності
         };

         if (text !== '/start' && text !== '/info' && text !== 'Info' && text !== '/bored' && text !== 'Bored' && text !== 'One more!'){ // Обробка решти текстових повідомлень, крім команд
            return bot.sendMessage(chatId, "A?");                 // Відправлення повідомлення у відповідь на невідому команду
         };
      });     
   };

start();                                                          // Виклик функції start для запуску бота