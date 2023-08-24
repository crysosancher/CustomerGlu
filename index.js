const TelegramBot = require('node-telegram-bot-api');
const os = require('os');
const ping = require('ping');

const bot = new TelegramBot('YOUR_BOT_TOKEN', { polling: true });

// Periodically send server health stats to users
setInterval(sendHealthStats, 6 * 60 * 60 * 1000); // Every 6 hours

// Handle /stats command to send current health stats
bot.onText(/\/stats/, async (msg) => {
  const chatId = msg.chat.id;
  const stats = await getHealthStats();
  bot.sendMessage(chatId, stats);
});

// Handle /processes command to send list of running processes
bot.onText(/\/processes/, async (msg) => {
  const chatId = msg.chat.id;
  const processes = await getRunningProcesses();
  bot.sendMessage(chatId, processes);
});

// Function to send health stats to users
async function sendHealthStats() {
  const stats = await getHealthStats();
  bot.sendMessage(chatId, stats);
}

// Function to gather server health stats
async function getHealthStats() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const cpuUsage = await getCpuUsage();
  
  return `CPU Usage: ${cpuUsage}%, Free Memory: ${freeMemory} bytes, Total Memory: ${totalMemory} bytes`;
}

// Function to get CPU usage percentage
async function getCpuUsage() {
  // Implement logic to calculate CPU usage
  // This could involve reading from /proc/stat or using third-party libraries
  // For simplicity, we'll return a random number between 0 and 100 here.
  return Math.floor(Math.random() * 101);
}

// Function to get list of running processes
async function getRunningProcesses() {
  // Implement logic to retrieve running processes
  // For simplicity, we'll return a mock list of processes.
  const processes = ['Process 1', 'Process 2', 'Process 3'];
  return processes.join('\n');
}

// Function to check VM responsiveness and notify users
setInterval(checkVMResponsiveness, 5000); // Every 5 seconds

async function checkVMResponsiveness() {
  // Implement logic to ping the VM and check responsiveness
  // For simplicity, we'll use the 'ping' library.
  const vmIp = 'VM_IP_ADDRESS';
  const res = await ping.promise.probe(vmIp);
  
  if (!res.alive) {
    const users = ['USER_CHAT_ID_1', 'USER_CHAT_ID_2']; // Add user chat IDs
    users.forEach(chatId => {
      bot.sendMessage(chatId, `VM at ${vmIp} is unresponsive!`);
    });
  }
}
