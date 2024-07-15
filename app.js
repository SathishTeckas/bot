const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const http = require('http');
const token = '7332835734:AAHB8ihpf2YZLru9Q4jjhEicwoFcz2w6fZE';
const bot = new TelegramBot(token, { polling: true });
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || 'User';
  bot.sendMessage(chatId, `Hello, ${name}! Welcome to GFXvs, where creators clash for daily cash prizes. Cast your vote to secure participation NFTs and a chance to win an exclusive 1:1 masterpiece. Connect your NEAR wallet to join the thrilling competition!. \nPlease click 👇 the Play button to participate in the battle.`);
});
// Matches "/help"
bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Here are the available commands:\n/start - Start the bot\n/help - Get help');
});
// Fallback for unknown commands
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  // if (text.startsWith('/')) {
  //   bot.sendMessage(chatId, 'Unknown command. Use /help to see the list of available commands.');
  // }
});
const app = express();
app.get('/', (req, res) => {
  res.send('Telegram bot is running!');
});
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
bot.on('polling_error', (error) => {
  console.log(`Polling error: ${error.message}`);
});
console.log('Telegram bot started!');
