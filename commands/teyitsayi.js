const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => 
{
let kisi = (message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member)
let erkek = await db.fetch(`erkek?${kisi.user.id}`) || 0
let toplam = await db.fetch(`teyit?${kisi.user.id}`) || 0
let kadin = await db.fetch(`kadin?${kisi.user.id}`) || 0
message.channel.send(new discord.MessageEmbed()
.setColor('GOLD')
.setTimestamp()
.setAuthor(kisi.user.tag, kisi.user.displayAvatarURL({dynamic: true}))
.setFooter(`Helsing`, message.guild.iconURL())
.setDescription(`**Toplam Teyit Sayın:** **\`${toplam}\`**
**Erkek:** **\`${erkek}\`**
**Kadın:** **\`${kadin}\`**
`)
)
}

module.exports.config = {
    name:'detay',
    aliases: ['teyitsayi', 'teyit-sayi', 'bilgi']
}