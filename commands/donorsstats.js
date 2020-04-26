const columnify = require('columnify');

module.exports = {
  name: 'donors-stats',
  description: 'Show Team Members Statistics',
  execute(msg, args, fetch, TEAM) {
    msg.channel.send('FAH Team Members Stats');
    fetch(`https://stats.foldingathome.org/api/team/${TEAM.number}`)
    .then(response => { return response.json() })
    .then(data =>
      {
        let LastUpdate = 0;
        LastUpdate = data.last;
        TEAM.donors = data.donors.slice(0, 20);
        let table = columnify(TEAM.donors, {
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
    )
    .catch(err => {
      msg.channel.send(`Error: Issue with request for team stats! \n${err}`)
    })
  }
}
