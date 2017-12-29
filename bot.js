var token = process.env.TOKEN;

var Bot = require('node-telegram-bot-api');
var bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

var id = 0;
var event = schedule.scheduleJob("*/10 * * * * *", function() {
    console.log('This runs every 10 seconds');
    if (id != 0) { 
        bot.sendMessage(id, 'every 10 seconds');
    }
});


bot.onText(/^/, function (msg) {
  var name = msg.from.first_name;
  id = msg.chat.id;
  bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(function () {
    // reply sent!
  });
});

module.exports = bot;
