require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fetch = require('node-fetch');

bot.commands = new Discord.Collection();
const botCommands = require('./commands/commands.js');

Object.keys(botCommands).map(key => {
  bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TEAM = {
  number: 0,
  team: {
    "LastUpdate": '',
    "name": '',
    "rank": 0,
    "credit": 0,
    "wus": 0
  },
  donors: [{
    "rank": 0,
    "name": '',
    "credits": 0,
    "wus": 0
  }]
};


bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  const args = msg.content.split(/ +/);
  const command = args.shift().toLowerCase();

  if (!bot.commands.has(command)) {
    // If command Invalid, skip
    return;
  }

  try {
    bot.commands.get(command).execute(msg, args, fetch, TEAM);
  } catch (err) {
    msg.reply(`Error in execution of command: ${err}`);
  }
});
