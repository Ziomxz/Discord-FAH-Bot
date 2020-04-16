require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;
const fetch = require('node-fetch');
const columnify = require('columnify');
const { exec } = require('child_process');

const TEAM = {
  number: -1
};

const teamStats = [{
  "LastUpdate": '',
  "name": 'define team with "setteam <team number>"',
  "rank": 0,
  "credit": 0,
  "wus": 0
}];

let donors = [
  {"rank": 0, "name": 'define team with "setteam <team number>"', "credits": 0, "wus": 0}
]


bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  if (msg.content === 'help') {
    msg.channel.send(
` \`\`\`
Did you fetch the Repo, Alian Italian

You need team number for the bot.
Commands:
"help" - Prints this message
"setteam <team_number>" - Which team to track
"team-stats" - Prints out summary of team progress
"donors-stats" - Prints out team members scores
"fah-restart" - Restart App with Latest Files
\`\`\` `);
} else if (msg.content.slice(0,7) === 'setteam') {
    try {
      let teamNumber = Number(msg.content.replace('setteam ', ''))
      TEAM.number = teamNumber;
      msg.channel.send(`Team Number changed to ${TEAM.number}`)
    }
    catch (err) {
      msg.channel.send(`Error: Invalid command! \n${err}`);
    }
  } else if (msg.content === 'team-stats') {
    msg.channel.send('FAH Team Stats');
    fetch(`https://stats.foldingathome.org/api/team/${TEAM.number}`)
    .then(response => { return response.json() })
    .then(data =>
      {
        teamStats[0].LastUpdate = data.last;
        teamStats[0].name = data.name;
        teamStats[0].rank = Number(data.rank);
        teamStats[0].credit = Number(data.credit);
        teamStats[0].wus = Number(data.wus);
        let table = columnify(teamStats, {
          columns: ['rank', 'name', 'credit', 'wus']
        })
        msg.channel.send(`Last Update: ${teamStats[0].LastUpdate} \n\`\`\`${table}\`\`\` `);
      }
    )
    .catch(err => {
      msg.channel.send(`Error: Issue with request for team stats! \n${err}`)
    })


  } else if (msg.content === 'donors-stats') {
    if (TEAM.number < 0) {
      msg.channel.send('Missing Team Number type "help" for commands \n*Large teams can break the bot');
    } else {
      msg.channel.send('FAH Team Members Stats');
      fetch(`https://stats.foldingathome.org/api/team/${TEAM.number}`)
      .then(response => { return response.json() })
      .then(data =>
        {
          let LastUpdate = 0;
          LastUpdate = data.last;
          donors = data.donors.slice(0, 20);
          let table = columnify(donors, {
            columns: ['rank', 'name', 'credit', 'wus'],
            config: {
              rank: {
                align: 'right'
              },
              credit: {
                align: 'right'
              },
              wus: {
                align: 'right'
              }
            }
          });
          msg.channel.send(`Last Update: ${LastUpdate} \n \`\`\`${table}\`\`\` `);
        }
      ).catch(err => {
        msg.channel.send(`Error: Issue with request for team stats! \n${err}`)
      })
    }


  } else if (msg.content === 'fah-restart') {
    msg.channel.send('Shuting Down and Fetching files from GitHub');
    exec('/bin/sh ../restart.sh');
    /*
    process.on('exit', function(data) {
      console.log(`Exiting`);
    });
    setTimeout(process.exit(0), 10000);
    */
  }
});
