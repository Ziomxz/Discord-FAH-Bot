module.exports = {
  name: 'setteam',
  description: 'Set FAH Team Number',
  execute(msg, args, fetch, TEAM) {
    try {
      if (isNaN(Number(args[0]))) { throw "not a number" }
      else if (0 > (Number(args[0]))) { throw "team_number must be positive" }
      TEAM.number = Number(args.shift());
      msg.channel.send(`Team Number changed to ${TEAM.number}`)
    }
    catch (err) {
      msg.channel.send(`Error: Invalid input; \n${err}`);
    }
  }
}
