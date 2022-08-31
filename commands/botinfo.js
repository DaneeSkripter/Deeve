const { Command, CommandType } = require('gcommands');
const Discord = require('discord.js')
const ms = require('ms')
const package = require('../package.json')
// Create a new command with the name 'hello'
new Command({
	name: 'about',
	description: 'Shows information about bot',
	// GCommands Next offers different types of commands, we will only use slash and message commands here.
	type: [CommandType.SLASH, CommandType.MESSAGE],
	// The function thats executed when the user uses the command.
	run: (ctx) => {
		const embed = new Discord.MessageEmbed
		embed.addFields(
            { name: 'Uptime', value: ms(ctx.client.uptime, { long: true}), inline: true},
            { name: 'Discord.js', value: package.dependencies['discord.js'], inline: true},
            { name: 'Node.js', value: package.nodejsver, inline: true},
            { name: 'Version', value: 'v1.0.0-beta.1', inline: true},
            { name: 'Developer', value: 'DaneeSkripter', inline: true},
            )
        embed.setColor("#189EDA")
		ctx.reply({ embeds: [embed]})
	}
});