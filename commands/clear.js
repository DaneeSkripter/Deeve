const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const Discord = require('discord.js')
const ms = require('ms')
const package = require('../package.json')
// Create a new command with the name 'hello'
new Command({
	name: 'clear',
	description: 'Clear messages in chat',
	// GCommands Next offers different types of commands, we will only use slash and message commands here.
	type: [CommandType.SLASH, CommandType.MESSAGE],
	// The function thats executed when the user uses the command.
    arguments: [
       new Argument({
            name: 'amount',
            description: 'Amount of messsages to delete',
            type: ArgumentType.INTEGER,
            required: true

       })
    ],
	run: (ctx) => {
        const amount = ctx.arguments.getInteger("amount")
        ctx.channel.bulkDelete(amount).catch(err => {
            const err_msg = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('I cannot delete messages older than 14 days. :/')
            ctx.reply({ embeds: [err_msg], ephemeral: true})
        })
        const msg = new Discord.MessageEmbed()
        .setColor("#189EDA")
        .setTitle(`I deleted ${amount} messages!`)
        ctx.reply({embeds: [msg], ephemeral: true})
	}
});