const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => 
{
if(!message.member.permissions.has('ADMINISTRATOR')) return;
let kisi = (message.mentions.members.first() || message.guild.members.cache.get(args[0]))
if(!kisi) {
    return message.channel.send(`Teyitini sıfırlaman için birini etiketlemelisin veya idsini girmelisin...`)
}
if(!args[1]) {
    return message.channel.send(new discord.MessageEmbed()
    .setTitle(`Yanlış Kullanım`)
    .setDescription(`Bir parametre girmelisin;
    
    !teyitsifirla @kisi erkek <miktar>
    !teyitsifirla @kisi kadın <miktar>
    !teyitsifirla @kisi purge - (\`Hepsini Siler\`)
    `)
    )
}
if(args[1] === 'erkek') {
let miktar = args[2]
if(!miktar) {
    return message.channel.send(new discord.MessageEmbed()
.setAuthor(kisi.user.username, kisi.user.displayAvatarURL({dynamic: true}))
.setDescription(`Ne kadar miktar silmek istiyorsun? Bu kişinin güncel kayıt istatistikleri;
Erkek: ${db.fetch(`erkek?${kisi.user.id}`) || 0}
Kadın: ${db.fetch(`kadin?${kisi.user.id}`) || 0}
Toplam: ${db.fetch(`teyit?${kisi.user.id}`) || 0}
`)
)
}
const filter = (reaction, user) => {
    return user.id === message.author.id
}
message.channel.send(`Bu kişinin toplamda \`${miktar}\` erkek teyit sayısı silinecektir, kabul ediyor musun?`).then(async mesaj => {
   mesaj.react('✔️')
   mesaj.react('❌')
    const collector = await mesaj.createReactionCollector(filter, {max: 1, time: 30000})
    collector.on('collect', async(reaction, user) => {
        if(reaction.emoji.name === '✔️') {
            db.subtract(`erkek?${kisi.user.id}`, miktar)
            db.subtract(`teyit?${kisi.user.id}`, miktar)
            return message.channel.send(`Bu kişiden \`${miktar}\` miktarda erkek teyit silindi.`)
        } else if(reaction.emoji.name === '❌') {
            return message.channel.send(`İşlem iptal edildi.`)
        }
    })
    collector.on('end', async collected => {
        if(!collected) {
            return message.channel.send(`İşlem iptal edildi.`)
        } else {

        }
    })
})
}

if(args[1] === 'kadın') {
    let miktar = args[2]
    if(!miktar) {
        return message.channel.send(new discord.MessageEmbed()
    .setAuthor(kisi.user.username, kisi.user.displayAvatarURL({dynamic: true}))
    .setDescription(`Ne kadar miktar silmek istiyorsun? Bu kişinin güncel kayıt istatistikleri;
    Erkek: ${db.fetch(`erkek?${kisi.user.id}`) || 0}
    Kadın: ${db.fetch(`kadin?${kisi.user.id}`) || 0}
    Toplam: ${db.fetch(`teyit?${kisi.user.id}`) || 0}
    `)
    )
    }
    const filter = (reaction, user) => {
        return user.id === message.author.id
    }
    message.channel.send(`Bu kişinin toplamda \`${miktar}\` kadın teyit sayısı silinecektir, kabul ediyor musun?`).then(async mesaj => {
       mesaj.react('✔️')
       mesaj.react('❌')
        const collector = await mesaj.createReactionCollector(filter, {max: 1, time: 30000})
        collector.on('collect', async(reaction, user) => {
            if(reaction.emoji.name === '✔️') {
                db.subtract(`kadin?${kisi.user.id}`, miktar)
                db.subtract(`teyit?${kisi.user.id}`, miktar)
                return message.channel.send(`Bu kişiden \`${miktar}\` miktarda kadın teyit silindi.`)
            } else if(reaction.emoji.name === '❌') {
                return message.channel.send(`İşlem iptal edildi.`)
            }
        })
        collector.on('end', async collected => {
            if(!collected) {
                return message.channel.send(`İşlem iptal edildi.`)
            } else {
                
            }
        })
    })
    }

    if(args[1] === 'purge') {
        const filter = (reaction, user) => {
            return user.id === message.author.id
        }
        message.channel.send(`Bu kişinin toplamda \`${db.fetch(`teyit?${kisi.user.id}`)}\` toplam teyit sayısı silinecektir, kabul ediyor musun?`).then(async mesaj => {
           mesaj.react('✔️')
           mesaj.react('❌')
            const collector = await mesaj.createReactionCollector(filter, {max: 1, time: 30000})
            collector.on('collect', async(reaction, user) => {
                if(reaction.emoji.name === '✔️') {
                     message.channel.send(`Bu kişiden \`${db.fetch(`teyit?${kisi.user.id}`)}\` miktarda teyit silindi.`)
                    db.delete(`kadin?${kisi.user.id}`)
                    db.delete(`erkek?${kisi.user.id}`)
                    db.delete(`teyit?${kisi.user.id}`)
                   
                } else if(reaction.emoji.name === '❌') {
                    return message.channel.send(`İşlem iptal edildi.`)
                }
            })
            collector.on('end', async collected => {
                if(!collected) {
                    return message.channel.send(`İşlem iptal edildi.`)
                } else {
                    
                }
            })
        })
        }

}

module.exports.config = {
    name: 'teyitsifirla',
    aliases: ['teyitsıfırla', 'teyit-sıfırla', `teyit-sifirla`]
}