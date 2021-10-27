const discord = require('discord.js')
const db = require('quick.db')

module.exports.run = async(client, message, args) => {

    const olanlar = message.guild.members.cache.filter(e => db.has(`teyit?${e.user.id}`))
    const ar = olanlar.array().sort((a ,b ) => {
        return db.fetch(`teyit?${b.user.id}`) - db.fetch(`teyit?${a.user.id}`)
    }).slice(0, 10)

    const ids = ar.map(e => e)
    const erkek = ar.map(e => db.fetch(`erkek?${e.user.id}`) || 0)
    const kadin = ar.map(e => db.fetch(`kadin?${e.user.id}`) || 0)
    const toplam = ar.map(e => db.fetch(`teyit?${e.user.id}`))
    let data = []

    for(let i = 0;i<ar.length;i++) {
        data.push(`\`${i+1}.\` - ${ids[i]} Toplam Teyit: **${toplam[i]}** (**${erkek[i]}** Erkek, **${kadin[i]}** Kadın)`)
    }

    message.channel.send(new discord.MessageEmbed()
    .setAuthor(`Teyit siralamasi`, message.guild.iconURL())
    .setColor('GOLD')
    .setFooter(`by. Marissa fxck up?`, client.user.avatarURL())
    .setDescription(data)
    )


}


module.exports.config = {
    name: 'kayitlb',
    aliases: ['lb']
}
