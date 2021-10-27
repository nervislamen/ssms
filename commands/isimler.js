const discord = require('discord.js')
const db = require('quick.db')
  module.exports.run = async(client, message, args) => {
    if(!message.member.roles.cache.has(process.env.KAYIT_YETKILI)) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')
    let kisi = (message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    const bul = await db.fetch(`isimler?${kisi.user.id}`)
    const data = []
    if(!bul) return message.channel.send(`Bu üyenin geçmiş isim kaydı bulunamadı.`)
    for(let i = 0;i<bul.length;i++) {
data.push(`\`${i+1}.\` - ${bul[i]}`)
    }
    message.channel.send(new discord.MessageEmbed()
    .setColor('GOLD')
    .setTimestamp()
    .setAuthor(kisi.user.username, kisi.user.displayAvatarURL({dynamic: true}))
    .setDescription(`Bu üyenin toplamda **${bul.length}** isim kaydı bulundu.
    
    ${data.join('\n')}
    `)
    )
  }
  module.exports.config = {
    name: 'isimler',
    aliases: []
  }