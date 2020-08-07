require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("NzQwODc1NDE1Nzg2MDk0NjA0.XyvX_w.Lxi4lbOJEpRF7GN0gQuhjXPr51s");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return 
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Başarıyla Pinglendi.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`p!yardım | GamerWolf`)
  console.log(`Logined`)
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "p!uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("**<a:NO:713356411458814022> Zaten Eklenmiş !!!**")
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("**<a:YES:713356424159428649> Başarılı Bir Şekilde 7/24 Yapıldı !!!**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
    message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
    message.channel.send();
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("<a:NO:713356411458814022> **Error Yalnızca Mutlak URL'ler Desteklenir.**")
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "p!botsay") {
  var link = spl[1]
 message.channel.send(`**${db.get("linkler").length} / 1000**`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "p!yardım") {
let embed = new Discord.RichEmbed()
.setColor('#4ca74c')
.addField(`Uptime Bot Yardım Sistemi`, `**Bot Glitch Sitelerinin 7/24 Açık Çalışmasını Sağlayan Bir Sistem İçerir. Sistemdeki Bağlantılar Herhangi Bir Bakım Gerektirmeden 7/24 Çalışır.**`)
.addField(`Genel Komutlar`,`

\`p!yardım\` - Yardım Menüsünü Gösterir.
\`p!uptime\` - Sisteme Bot Eklersiniz.
\`p!botsay\` - Sistemde Kaç Bot Olduğunu Listeler.
`)
.addField(`Link`, `[GamerWolf - YouTube](https://www.youtube.com/channel/UCru0cqYPRfERBkQ_uRtcFdw)
[Botumuzu Ekleyin](https://discord.com/oauth2/authorize?client_id=740875415786094604&scope=bot&permissions=8)
[Destek Sunucumuz](https://discord.gg/HkQ9Uaf)`)
.setThumbnail(client.user.avatarURL)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`**2020 © Uptime | Kodlayan MertBhey , Editleyen GamerWolf.**`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})


client.on("message", async message => {

  if(!message.content.startsWith("p!eval")) return;
  if(!["573548185428164630","573548185428164630"].includes(message.author.id)) return;
  var args = message.content.split("p!eval")[1]
  if(!args) return message.channel.send("**<a:NO:713356411458814022> ..**")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })
  
  const log = message => {
  console.log(`${message}`);
}
  
  