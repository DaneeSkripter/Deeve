const { Command, CommandType } = require('gcommands');
const Discord = require('discord.js')
// Create a new command with the name 'hello'
new Command({
	name: 'ping',
	description: 'Shows bot ping',
	// GCommands Next offers different types of commands, we will only use slash and message commands here.
	type: [CommandType.SLASH, CommandType.MESSAGE],
	// The function thats executed when the user uses the command.
	run: (ctx) => {
		const embed = new Discord.MessageEmbed
		embed.setTitle(`🏓 My ping is ${ctx.client.ws.ping} ms`)
		embed.setColor("#189EDA")
		ctx.reply({ embeds: [embed]})
	}
});