const columnify = require('columnify');

module.exports = {
  name: 'team-stats',
  description: 'Show Team Statistics',
  execute(msg, args, fetch, TEAM) {
    msg.channel.send('FAH Team Statistics');
    fetch(`https://stats.foldingathome.org/api/team/${TEAM.number}`)
    .then(response => { return response.json() })
    .then(data =>
      {
        let LastUpdate = 0;
        LastUpdate = data.last;
        TEAM.team.name = data.name;
        TEAM.team.rank = Number(data.rank);
        TEAM.team.credit = Number(data.credit);
        TEAM.team.wus = Number(data.wus);

        TEAM.donors = data.donors.slice(0, 20);

        let table = columnify([ TEAM.team , {} ].concat(TEAM.donors), {
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
        msg.channel.send(`Last Update: ${LastUpdate} \n
\`\`\`Team Number : ${TEAM.number}\n
${table}
\`\`\` `);
      }
    )
    .catch(err => {
      msg.channel.send(`Error: Issue with request for team stats! \n${err}`)
    })
  }
}
