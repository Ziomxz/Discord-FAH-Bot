
module.exports = {
  name: 'help',
  description: 'Show Commands',
  execute(msg, args, fetch, TEAM) {
    msg.channel.send(
` \`\`\`
Commands:
"help" - Prints this message
"setteam <team_number>" - Which team to track
"team-stats" - Prints out summary of team progress with top 20 donors/users
\`\`\` `
    );
  }
}
