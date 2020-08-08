require("express")().listen(1343);

const db = require("quick.db"); 
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("NzQxNjI4NzkwNjY4Nzg3ODIz.Xy6Vog.AJBvm3Cej-w6TbhHPlpIA3HAMN0");
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
  client.user.setActivity(`u!yardım | GamerWolf Kanalına Abone Olmayı Unutmayın !!!`)
  console.log(`Logined`)
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u!uptime") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("**⛔ Zaten Eklenmiş !!!**")
    
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("**✅ Başarılı Bir Şekilde 7/24 Yapıldı !!!**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
    message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
    message.channel.send();
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    let yardım = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor(0x6A3DB8)
        .setDescription("⛔ **Error Yalnızca Mutlak URL'ler Desteklenir.**")
        .setFooter(`© ${client.user.username}`, client.user.avatarURL)
        .setTimestamp()
    message.channel.send(yardım).then(msg => msg.delete(60000)); //60000/60 saniye sonra verilen yanıtı siler
    return message.channel.send()
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "u!botsay") {
  var link = spl[1]
 message.channel.send(`**${db.get("linkler").length} / 1000**`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "u!yardım") {
let embed = new Discord.RichEmbed()
.setColor('#070706')
.addField(`Discord Uptime Bot Yardım Sistemi`, `**Discord Botlarınız Benim Sayemde 7/24  :) `)
.addField(``,`

 **u!yardım**  | Discord Uptime Botunun Yardım Sistemini Gösterir  (Burası)

 **u!uptime-ekle**  | Botunuzu 7/24 Aktif Tutmak İçin Kullanılan Komut

 **u!eval**    | Eval

 **u!botsay** | Sistemde Kaç Bot Olduğuna Bakar

`)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`Uptime Bot | Kodlayan Emir Bolat , Editleyen GamerWolf.`, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})


client.on("message", async message => {

  if(!message.content.startsWith("p!eval")) return;
  if(!["573548185428164630"].includes(message.author.id)) return;
  var args = message.content.split("p!eval")[1]
  if(!args) return message.channel.send("**⛔ ..**")
  
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
  
  