const { Command, CommandType } = require('gcommands');
const Discord = require('discord.js')
const ms = require('ms')
const package = require('../package.json')
// Create a new command with the name 'hello'
new Command({
	name: 'links',
	description: 'Shows bot links',
	// GCommands Next offers different types of commands, we will only use slash and message commands here.
	type: [CommandType.SLASH, CommandType.MESSAGE],
	// The function thats executed when the user uses the command.
	run: (ctx) => {
		const embed = new Discord.MessageEmbed
        embed.setDescription("[GitHub](https://github.com/DaneeSkripter/Deeve)\n Website (Comming soon...)")
        embed.setColor("#189EDA")
		ctx.reply({ embeds: [embed]})
	}
});