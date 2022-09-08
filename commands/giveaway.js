const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const Discord = require('discord.js')
const client = require("../index").client
const ms = require('ms')
// Create a new command with the name 'hello'
new Command({
	name: 'giveaway',
	description: 'Manage giveaways',
	// GCommands Next offers different types of commands, we will only use slash and message commands here.
	type: [CommandType.SLASH, CommandType.MESSAGE],
	// The function thats executed when the user uses the command.
    arguments: [
       new Argument({
            name: 'start',
            description: 'Start giveaway',
            type: ArgumentType.SUB_COMMAND,
            arguments: [
                new Argument({
                    name: "duration",
                    description: "Duration of giveaway",
                    type: ArgumentType.STRING,
                    required: true
                }),
                new Argument({
                    name: "winner-count",
                    description: "Count of winners",
                    type: ArgumentType.INTEGER,
                    required: true
                }),
                new Argument({
                    name: "prize",
                    description: "Prize of giveaway",
                    type: ArgumentType.STRING,
                    required: true
                }),
                new Argument({
                    name: "channel",
                    description: "Channel of giveaway",
                    type: ArgumentType.CHANNEL,
                    required: true
                }),
            ]

       }),
       new Argument({
        name: 'reroll',
        description: 'Reroll a giveaway',
        type: ArgumentType.SUB_COMMAND,
        arguments: [
            new Argument({
                name: "message-id",
                description: "ID of giveaway message",
                type: ArgumentType.STRING,
                required: true
            })
        ] 
       }),
       new Argument({
        name: 'edit',
        description:'Edit a giveaway',
        type: ArgumentType.SUB_COMMAND,
        arguments: [
            new Argument({
                name: "message-id",
                description: "ID of giveaway message",
                type: ArgumentType.STRING,
                required: true
            }),
            new Argument({
                name: "addtime",
                description: "Add time to giveaway",
                type: ArgumentType.STRING,
                required: true
            }),
            new Argument({
                name: "new-winner-count",
                description: "New count of winners",
                type: ArgumentType.INTEGER,
                required: true
            }),
            new Argument({
                name: "new-prize",
                description: "New name of prize",
                type: ArgumentType.STRING,
                required: true
            }),
        ] 
       }),
       new Argument({
        name: 'end',
        description: 'End a giveaway',
        type: ArgumentType.SUB_COMMAND,
        arguments: [
            new Argument({
                name: "message-id",
                description: "ID of giveaway message",
                type: ArgumentType.STRING,
                required: true
            })
        ] 
       }),

    ],
	run: (ctx) => {
        const subcmd = ctx.arguments.getSubcommand()
        
        if (subcmd == "start") {
            const duration = ctx.arguments.getString("duration")
            const winnercount = ctx.arguments.getInteger("winner-count")
            const prize = ctx.arguments.getString("prize")
            const channel = ctx.arguments.getChannel("channel")
            client.giveawaysManager
            .start(channel, {
                duration: ms(duration),
                winnerCount: winnercount,
                prize: prize
            })
            const startedmsg = new Discord.MessageEmbed()
            .setColor("#189EDA")
            .setTitle("Giveaway has started!")
            ctx.reply({ embeds: [startedmsg], ephemeral: true})
        } else if (subcmd == "reroll") {
            const messageid = ctx.arguments.getString("message-id")
            client.giveawaysManager
            .reroll(messageid)
            .then(() => {
                const rerollmsg = new Discord.MessageEmbed()
                .setColor("#189EDA")
                .setTitle("Giveaway rerolled!")
                ctx.reply({ embeds: [rerollmsg]})
            }).catch((err) => {
                ctx.reply({content: "Invalid ID!", ephemeral: true})
            });
        } else if (subcmd == "edit") {
            const messageid = ctx.arguments.getString("message-id")
            const duration = ctx.arguments.getString("addtime")
            const winnercount = ctx.arguments.getInteger("new-winner-count")
            const prize = ctx.arguments.getString("new-prize")
            client.giveawaysManager
            .edit(messageid, {
                addTime: ms(duration),
                newWinnerCount: winnercount,
                newPrize: prize
            }).catch((err) => {
                ctx.reply({content: "Invalid ID!", ephemeral: true})
            });
            const editmsg = new Discord.MessageEmbed()
            .setColor("#189EDA")
            .setTitle("Giveaway edited!")
            ctx.reply({ embeds: [editmsg]})
        } else if (subcmd == "end") {
            const messageid = ctx.arguments.getString("message-id")
            client.giveawaysManager
            .delete(messageid)
            const endmsg = new Discord.MessageEmbed()
            .setColor("#189EDA")
            .setTitle("Giveaway ended!")
            ctx.reply({ embeds: [endmsg]})
        }
	}
});