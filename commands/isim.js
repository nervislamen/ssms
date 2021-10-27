const discord = require('discord.js')
const db = require('quick.db')
 module.exports.run =  async(client, message, args) => {
    if(!message.member.roles.cache.has(process.env.KAYIT_YETKILI)) return message.channel.send('Bu komutu kullanabilmek için gerekli role sahip değilsin.')
    let kisi = (message.mentions.members.first() || message.guild.members.cache.get(args[0]))
    let isim = args[1]
    let yas = args[2]
    if(!kisi) return message.channel.send(`Kimi kaydetmeye çalışıyorsun?`)
    if(kisi.user.id === message.author.id) return message.channel.send(`Kendi ismini değiştiremezsin.`)
       if(kisi.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(`Bu kişinin rolü/rolleri senden daha yukarıda.`)
    if(kisi.roles.cache.has(process.env.KAYIT_YETKILI)) return message.channel.send(`Kayıt yetkilisinin ismini değiştiremezsin.`)
    if(!isim) return message.channel.send(`Bir isim girmelisin.`)
    if(!yas) return message.channel.send(`Bir yaş girmelisin.`)
    const isimlerr = db.fetch(`isimler?${kisi.user.id}`)
    kisi.setNickname(`る ${isim} | ${yas}`)
    db.set(`isimdegisti?${kisi.user.id}`, true)
    if(isimlerr && isimlerr.length > 0) {
      const isimler = isimlerr.slice(0, 5)
      let data = []
      for(let i = 0;i<isimlerr.length;i++) {
data.push(`${isimler[i]}`)
      }
       message.channel.send(new discord.MessageEmbed()
      .setColor('GOLD')
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`${kisi} üyesinin ismi başarıyla "る${isim} | ${yas}" ismine değiştirildi.
      
      Kişi şu isimler ilede kayıt olmuş:\n${data.join('\n')}

      Tüm isim geçmişine .isimler \`@${kisi.user.username}\` ile bakmanız önerilir.
      `)
      .setTimestamp()
      )
    } else {
       message.channel.send(new discord.MessageEmbed()
      .setColor('GOLD')
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(`${kisi} üyesinin ismi "${isim} | ${yas}" ismine değiştirildi.`)
      .setTimestamp()
      )
    }
  }
module.exports.config = {
  name: 'isim',
  aliases: ['i', 'is', 'isimdegis']
}