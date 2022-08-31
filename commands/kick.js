const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const Discord = require('discord.js')
// Create a new command with the name 'hello'
new Command({
	name: 'kick',
	description: 'Kick a user',
	// GCommands Next offers different types of commands, we will only use slash and message commands here.
	type: [CommandType.SLASH, CommandType.MESSAGE],
	// The function thats executed when the user uses the command.
    arguments: [
        new Argument({
            name: "user",
            description: "User to kick",
            type: ArgumentType.USER,
            required: true
        }),
        new Argument({
            name: "reason",
            description: "Kick reason",
            type: ArgumentType.STRING,
            required: false
        }),
    ],
	run: (ctx) => {
        if (!ctx.member.permissions.has("KICK_MEMBERS")) {
            const noperms = new Discord.MessageEmbed
            noperms.setTitle("Sorry, but you don't have permissions to do that.")
            noperms.setColor("RED")
            ctx.reply({ embeds: [noperms], ephemeral: true})
        } else if (!ctx.guild.me.permissions.has("KICK_MEMBERS")) {
            const botnoperms = new Discord.MessageEmbed
            botnoperms.setTitle("Sorry, but I don't have permissions to do that.")
            botnoperms.setColor("RED")
            ctx.reply({ embeds: [botnoperms], ephemeral: true})
        } else {
            const user = ctx.arguments.getMember("user")
            const reason = ctx.arguments.getString("reason")
            if (user.kickable) {
                const kickmsg = new Discord.MessageEmbed
                kickmsg.setColor("#189EDA")
                if (!reason ) {
                    kickmsg.setDescription(`<@${user.id}> has been kicked.`)
                    ctx.reply({ embeds: [kickmsg]})
                    user.kick()
                }  else {
                    kickmsg.setDescription(`<@${user.id}> has been kicked for **${reason}**.`)
                    ctx.reply({ embeds: [kickmsg]})
                    user.kick({reason: reason})
                }
            } else {
                const cantkick = new Discord.MessageEmbed
                cantkick.setTitle("Sorry, but I can't kick this user.")
                cantkick.setColor("RED")
                ctx.reply({embeds: [cantkick], ephemeral: true})
            }
        }

    }
});