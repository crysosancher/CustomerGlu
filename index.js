const TelegramBot = require('node-telegram-bot-api');
const ps = require('ps-node');
const axios = require('axios');

// Set up your Telegram Bot API token
const TELEGRAM_TOKEN = "TeleGram Token";
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Function to get server health stats
function getHealthStats() {
  try {
    const cpuPercent = Math.round(require('os').loadavg()[0] * 100);
    const ramPercent = Math.round((1 - require('os').freemem() / require('os').totalmem()) * 100);
    return `CPU: ${cpuPercent}%\nRAM: ${ramPercent}%`;
  } catch (error) {
    console.error('Error getting health stats:', error);
    return 'Error getting health stats.';
  }
}

// Command handler for '/stats' command
bot.onText(/\/stats/, (msg) => {
  const chatId = msg.chat.id;
  const stats = getHealthStats();
  bot.sendMessage(chatId, stats);
});

// Function to check VM responsiveness
async function checkVmResponsiveness() {
  const vmUrl = 'http://your_vm_url';
  try {
    await axios.get(vmUrl, { timeout: 5000 });
  } catch (error) {
    notifyUsersVmNotResponding();
  }
}

// Function to notify users if VM is not responding
function notifyUsersVmNotResponding() {
  // Implement sending notifications to users
}

// Command handler for '/processes' command
bot.onText(/\/processes/, (msg) => {
  const chatId = msg.chat.id;
  try {
    ps.lookup({}, (err, processes) => {
      if (err) {
        console.error('Error getting processes:', err);
        bot.sendMessage(chatId, 'Error getting processes.');
        return;
      }
      
      const sortedProcesses = processes.sort((a, b) => b.cpu - a.cpu); // Sort by CPU usage
      const topProcesses = sortedProcesses.slice(0, 10); // Get top 10 processes
      
      const processesList = topProcesses.map(proc => `PID: ${proc.pid}, Name: ${proc.command}`).join('\n');
      bot.sendMessage(chatId, processesList);
    });
  } catch (error) {
    console.error('Error handling /processes command:', error);
    bot.sendMessage(chatId, 'Error processing /processes command.');
  }
});

// Periodically check VM responsiveness
setInterval(() => {
  try {
    checkVmResponsiveness();
  } catch (error) {
    console.error('Error checking VM responsiveness:', error);
  }
}, 5000);

// Handle other messages and commands
bot.on('message', (msg) => {
  // Handle other messages if needed
	//msg is not command
	const chatId = msg.chat.id;
	console.log(msg.text.includes('/stats'));
	if(!(msg.text.includes('/stats') || msg.text.includes('/processes'))){
	bot.sendMessage(chatId, 'The command is not supported,try with /stats or /processes');
	}
	
});

console.log('Bot is running...');
