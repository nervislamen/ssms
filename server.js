const discord = require('discord.js');
const client = new discord.Client();
const db = require('quick.db')
require('dotenv').config()
require('moment-duration-format')
const mongoose = require('mongoose')
const moment = require('moment')
const fs = require('fs');
const config = require("./config.json");
client.commands = new discord.Collection();
client.aliases = new discord.Collection()
fs.readdir("./commands", (err, files) => {
if(err) console.log(err)

let jsfile = files.filter(f => f.split(".").pop() === "js")
if(jsfile.length <= 0) {
    return console.log("[LOGS] couldnt find commands.")
}

jsfile.forEach((f, i) => {
let pull = require(`./commands/${f}`);
client.commands.set(pull.config.name, pull);
pull.config.aliases.forEach(alias => {
    client.aliases.set(alias, pull.config.name)
});
});

});

//cmd

////events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
   
      if (!file.endsWith(".js")) return;
     
      const event = require(`./events/${file}`);
      
      let eventName = file.split(".")[0];
   
      client.on(eventName, event.bind(null, client));
      delete require.cache[require.resolve(`./events/${file}`)];
    });
  });

  client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}.`);
  });
  
  client.on('message', message => {
  
  if(message.author.bot || message.channel.type === 'dm') return;
  let prefix = process.env.DISCORD_BOT_PREFIX
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0];
  let args = messageArray.slice(1)
  
  if(!message.content.startsWith(prefix)) return;
  let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
  if(commandfile) commandfile.run(client, message, args)
  });

//events

client.on('guildMemberRemove', async member => {
  if(member.nickname) {
    db.push(`isimler?${member.user.id}`, `${member.nickname} (Sunucudan Ayrılma)`)
  } else {
    return
  }
})

client.on('guildMemberAdd', async member => {
  let kacgun = moment.duration(new Date().getTime() - member.user.createdTimestamp).format('d')
  let sey;
  if(kacgun < 14) {
await member.roles.set([process.env.FAKEROL])
      sey = 'Bu kullanıcı şüpheli <a:unlm:791414107726544926>'
    member.guild.channels.cache.get('756857871408300045').send(new discord.MessageEmbed()
    .setColor('RED')
    .setDescription(`${member} üyesinin hesabı 14 günden önce kurulduğu için cezalıya atıldı.`)
    .setFooter(member.user.tag, member.user.displayAvatarURL({dynamic: true}))
    )
  } else {
   await member.roles.set([process.env.OTOROL])
    sey = 'Bu kullanıcı güvenli <a:ok25:791414082107736064>'
  }
    member.guild.channels.cache.get(process.env.HGKANAL).send(`
  ${member} Sunucumuza Hoş Geldin! :tada:
        
           Seninle birlikte **${member.guild.memberCount}** kişi olduk! **る** Tagımızı alarak bizlere destek olabilirsin! Kayıt olmak için sol tarafta gördüğün kanallara girip <@&756857868992643127> yetkililerine isim yaş vermen yeterli olacaktır.

           Hesabın **${moment(member.user.createdTimestamp + 10800000).format('DD/MM/YYYY HH:mm')}** tarihinde oluşturulmuş.
           
${sey}
  `)
})


client.login(process.env.DISCORD_BOT_TOKEN);
