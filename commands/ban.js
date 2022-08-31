const { Command, CommandType, Argument, ArgumentType } = require('gcommands');
const Discord = require('discord.js')
// Create a new command with the name 'hello'
new Command({
	name: 'ban',
	description: 'Ban a user',
	// GCommands Next offers different types of commands, we will only use slash and message commands here.
	type: [CommandType.SLASH, CommandType.MESSAGE],
	// The function thats executed when the user uses the command.
    arguments: [
        new Argument({
            name: "user",
            description: "User to ban",
            type: ArgumentType.USER,
            required: true
        }),
        new Argument({
            name: "reason",
            description: "Ban reason",
            type: ArgumentType.STRING,
            required: false
        }),
    ],
	run: (ctx) => {
        if (!ctx.member.permissions.has("BAN_MEMBERS")) {
            const noperms = new Discord.MessageEmbed
            noperms.setTitle("Sorry, but you don't have permissions to do that.")
            noperms.setColor("RED")
            ctx.reply({ embeds: [noperms], ephemeral: true})
        } else if (!ctx.guild.me.permissions.has("BAN_MEMBERS")) {
            const botnoperms = new Discord.MessageEmbed
            botnoperms.setTitle("Sorry, but I don't have permissions to do that.")
            botnoperms.setColor("RED")
            ctx.reply({ embeds: [botnoperms], ephemeral: true})
        } else {
            const user = ctx.arguments.getMember("user")
            const reason = ctx.arguments.getString("reason")
            if (user.bannable) {
                const banmsg = new Discord.MessageEmbed
                banmsg.setColor("#189EDA")
                if (!reason ) {
                    banmsg.setDescription(`<@${user.id}> has been banned.`)
                    ctx.reply({ embeds: [banmsg]})
                    user.ban()
                }  else {
                    banmsg.setDescription(`<@${user.id}> has been banned for **${reason}**.`)
                    ctx.reply({ embeds: [banmsg]})
                    user.ban({reason: reason})
                }
            } else {
                const cantban = new Discord.MessageEmbed
                cantban.setTitle("Sorry, but I can't ban this user.")
                cantban.setColor("RED")
                ctx.reply({embeds: [cantban], ephemeral: true})
            }
        }

    }
});