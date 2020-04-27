const { exec } = require('child_process');

module.exports = {
  Help: require('./help.js'),
  SetTeam: require('./setteam.js'),
  TeamStats: require('./teamstats.js'),
  Restart: {
    name: 'fah-restart',
    description: 'Update Files',
    execute(msg, args, fetch, TEAM) {
      msg.channel.send('Shuting Down and Fetching files from GitHub');
      exec('bash -c "../restart.sh"', (err, stdout, stderr) => {
        if (err) {
          console.log(`Error: ${err}`);
        } else {
          console.log(`STDOUT: ${stdout}`);
          console.log(`STDERR: ${stderr}`);
        }
      });
    }
  }
};
