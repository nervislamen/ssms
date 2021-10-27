const discord = require('discord.js')


module.exports = client => {
setTimeout(async() => {
  await client.user.setActivity('Marissa & Vanessia', {type: 'LISTENING'})
  //await client.channels.cache.get('772057273257164840').join()
  await client.user.setStatus(`dnd`)
}, 4750)

}