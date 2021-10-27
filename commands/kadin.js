const discord = require('discord.js')
const db = require('quick.db')
  module.exports.run = async(client, message, args) => {
    if(!message.member.roles.cache.has(process.env.KAYIT_YETKILI)) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')
    let kisi = (message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    if(!kisi) return message.channel.send(`Kimi kaydetmeye çalışıyorsun?`)
    if(!db.has(`isimdegisti?${kisi.user.id}`)) {
      return message.channel.send(`Bu uyenin ilk başta ismini değiştirmelisiniz.`)
    }
       if(kisi.user.id === message.author.id) return message.channel.send(`Kendini kayıt edemezisin.`)
   if(kisi.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kişinin rolü/rolleri senden daha yukarıda.`)
    if(kisi.roles.cache.has(process.env.KAYIT_YETKILI)) return message.channel.send(`Kayıt yetkisini kayıt edemezsin.`)
    await db.push(`isimler?${kisi.user.id}`, `${kisi.nickname} (<@&${process.env.KADIN_ROLE}>)`)
   await kisi.roles.add([process.env.KADIN_ROLE, process.env.KADIN_ROLE1])
    await kisi.roles.remove(process.env.OTOROL)
   db.add(`kadin?${message.author.id}`, 1)
   db.add(`teyit?${message.author.id}`, 1)
   return message.channel.send(new discord.MessageEmbed()
   .setColor('GOLD')
   .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
   .setDescription(`${kisi} üyesine başarıyla <@&${process.env.KADIN_ROLE}>, <@&${process.env.KADIN_ROLE1}> rolleri verildi.`)
   )
  }
  module.exports.config = {
    name: 'kadin',
    aliases: ['k', 'kadın']
  }