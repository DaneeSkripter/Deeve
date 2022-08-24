const { Command, CommandType } = require('gcommands');
const Discord = require('discord.js')
const ms = require('ms')
const package = require('../package.json')
// Create a new command with the name 'hello'
new Command({
	name: 'help',
	description: 'Shows all commands',
	// GCommands Next offers different types of commands, we will only use slash and message commands here.
	type: [CommandType.SLASH, CommandType.MESSAGE],
	// The function thats executed when the user uses the command.
	run: (ctx) => {
		const embed = new Discord.MessageEmbed
        embed.setDescription(`**📜 Moderation**\n**/clear** - Clear messages\n\n**⚠ Other**\n**/ping** - Show bot ping\n**/about** - Show informations about bot`)
        embed.setColor("WHITE")
		ctx.reply({ embeds: [embed]})
	}
});