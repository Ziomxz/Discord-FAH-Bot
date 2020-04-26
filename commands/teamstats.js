const columnify = require('columnify');

module.exports = {
  name: 'team-stats',
  description: 'Print Team Statistics',
  execute(msg, args, fetch, TEAM) {
    msg.channel.send('FAH Team Stats');
    fetch(`https://stats.foldingathome.org/api/team/${TEAM.number}`)
    .then(response => { return response.json() })
    .then(data =>
      {
        TEAM.team.LastUpdate = data.last;
        TEAM.team.name = data.name;
        TEAM.team.rank = Number(data.rank);
        TEAM.team.credit = Number(data.credit);
        TEAM.team.wus = Number(data.wus);
        let table = columnify([ TEAM.team ], {            // Row made of one team
          columns: ['rank', 'name', 'credit', 'wus']
        })
        msg.channel.send(`Last Update: ${TEAM.team.LastUpdate} \n\`\`\`${table}\`\`\` `);
      }
    )
    .catch(err => {
      msg.channel.send(`Error: Issue with request for team stats! \n${err}`)
    })
  }
}
