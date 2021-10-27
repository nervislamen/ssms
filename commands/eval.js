const Discord = require("discord.js");
const bot = new Discord.Client();
const ayarlar = require("../config.json");
const db = require('quick.db')
const si = require("systeminformation");
const util = require("util");

module.exports.run = async (client, message, args) => {
  if (message.author.id !== "742776529892933653") {
    return message.delete();
  }
  if (!args[0] || args[0].includes("token")) {
    return message.delete();
  }
  const code = args.join(" ");
  try {
    var evaled = clean(await eval(code));
    if (evaled.match(new RegExp(`${client.token}`, "g")))
      evaled
        .replace("token", "**Bu Botun `TOKENİNE` Bu Komut ile Erişemessin!**")
        .replace(
          client.token, //
          "**Bu Botun `TOKENİNE` Bu Komut ile Erişemessin!**"
        )
        .replace(
          process.env.PROJECT_INVITE_TOKEN,
          "**Bu Botun `TOKENİNE` Bu Komut ile Erişemessin!**"
        );
    message.channel.send(
      `${evaled
        .replace(
          client.token,
          "**Bu Botun `TOKENİNE` Bu Komut ile Erişemessin!**"
        )
        .replace(
          process.env.PROJECT_INVITE_TOKEN,
          "**Bu Botun `TOKENİNE` Bu Komut ile Erişemessin!**"
        )}`,
      { code: "js", split: true }
    );
  } catch (err) {
    message.channel.send(err, { code: "js", split: true });
  }

  function clean(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 0 });
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
};
module.exports.config = {
  name: "eval",
  aliases: ["eval", "arabaal"]
};
