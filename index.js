const Discord = require('discord.js');

const client = new Discord.Client();

var prefix = "*";

const ytdl = require('ytdl-core');

const queue = new Map();

var servers = {};

client.login(process.env.TOKEN);

function play(connection, message) {

    var server = servers[message.guild.id];
  
    server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"}));
  
    server.queue.shift();
  
    server.dispatcher.on("end", function() { 
      if (server.queue[0]) play(connection, message);
  
      else connection.disconnect();
  
    });
  }

client.on("ready", () => {
    console.log("Je suis en ligne");
    client.user.setGame("Modo et Music sur Drakaria Network")
});

client.on(`message`, message => {

    if(message.content === "Bonjour") {
        message.reply("Salut!!!!");
        console.log('le bot dit bonjour');
    }
    if(message.content.startsWith(prefix + "joueur")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un membre")
        }

        var joueur = message.guild.member(message.mentions.users.first());
        if(!joueur) {
            return message.channel.send("Le membre est inconnu :/")
        }

        if(!message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("Je n'ai pas la permissions pour spam");
        }

        joueur.send().then(member => {
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
            message.channel.send(`${member.user.username} est spam par ${message.author.username}`);
        });
    }

    if(message.content === prefix + "help") {
        var aide_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:robot: Voici mes catégories d'aide !`)
        .setDescription(`Voici mes commandes disponible :`)
        .setThumbnail(message.author.avatarURL)
        .addField(":tools: Modération", "Fais `*mod` pour voir mes commandes de modération !")
        .addField(":tada: Fun", "Fais `*fun` pour voir mes commandes d'animation !")
        .addField(":musical_note: Musique", "Fais `*music` pour voir mes commandes musiques")
        .setFooter("Menu d'aide @Drakaria Network")
        .setTimestamp()
        message.channel.send(aide_embed);
      }
  
      if(message.content === prefix + "mod") {
        var mod_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:tools: Voici mes commandes modérations !`)
        .setThumbnail(message.author.avatarURL)
        .addField("*kick <@user>", "Kick l'utilisateur !")
        .addField("*ban <@user>", "Ban l'utilisateur !")
        .addField("*clear nombre", "Supprime le nombre de messages indiqué")
        .addField("*mute <@user>", "Mute l'utilisateur mentionné")
        .addField("*unmute <@user>", "Unmute l'utilisateur mentionné")
        .addField("*warn", "Averti l'utilisateur")
        .addField("*seewarns", "Affiche les Warns du membre")
        .addField("*deletewarns", "Supprime le warn du membre")
        .setFooter("Commande modération @Drakaria Network")
        .setTimestamp()
        message.channel.send(mod_embed);
      }
  
      if(message.content === prefix + "fun") {
        var fun_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:tools: Voici mes commandes amusantes !`)
        .setThumbnail(message.author.avatarURL)
        .addField("Bonjour", "Le bot répond !")
        .addField("*stats", "Le bot vous envoie des informations sur votre profil !")
        .addField("*info", "Donne des indormations sur le bot et le serveur !")
        .setFooter("Commande Fun @Drakaria Network")
        .setTimestamp()
        message.channel.send(fun_embed);
      }

      if(message.content === prefix + "music") {
        var fun_embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle(`:tools: Voici mes commandes de music !`)
        .setThumbnail(message.author.avatarURL)
        .addField("*play", "Met de la music")
        .addField("*stop", "Arrête la musique")
        .addField("*skip", "Met la prochaine musique")
        .setFooter("Commande Music @Drakaria Network")
        .setTimestamp()
        message.channel.send(fun_embed);
      }

    /*if(message.content === prefix + `help`) {
        var help_embed = new Discord.RichEmbed()
        .setColor("#5DADE2")
        .setTitle("Help")
        .setThumbnail(message.author.avatarURL)
        .setDescription("Affiche toutes les commandes")
        .addField("*help", "Affiche les commandes")
        .addField("Bonjour", "Le Bot Repond")
        .addField("*stats", "Affiche Votre Profil")
        .addField("*info", "Info sur le serveur")
        .addField("*kick", "Expulse le membre")
        .addField("*ban", "Ban le membre")
        .addField("*clear", "Supprime les messages")
        .addField("*mute", "mute le membre dans ce salon")
        .addField("*unmute", "unmute le membre dans ce salon")
        .addField("*warn", "Averti l'utilisateur")
        .addField("*seewarns", "Affiche les Warns du membre")
        .addField("*deletewarns", "Supprime le warn du membre")
        .setFooter("Menu Help @Drakaria Network")
        message.channel.sendMessage(help_embed);
        console.log("Menu Help")
    }*/

    if(message.content === prefix + "info") {
        var info_embed = new Discord.RichEmbed()
        .setColor("#DC7633")
        .setTitle("Info sur le serveur")
        .addField(" :robot: Nom :", `${client.user.tag}`, true)
        .addField("Descriminateur du bot :hash:", `#${client.user.discriminator}`)
        .addField("ID : :id: ", `${client.user.id}`)
        .addField("Nombre de membres", message.guild.members.size)
        .addField("Nombre de Catégories et de salons", message.guild.channels.size)
        .setFooter("Info @Drakaria Network")
        message.channel.sendMessage(info_embed)
        console.log("Info")
    }

    if(message.content.startsWith(prefix + "kick")) {
        if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un membre")
        }

        var kick = message.guild.member(message.mentions.users.first());
        if(!kick) {
            return message.channel.send("Le membre est inconnu :/")
        }

        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permissions pour kick");
        }

        kick.kick().then(member => {
            message.channel.send(`${member.user.username} est kick par ${message.author.username}`);
        });
    }

    if(message.content.startsWith(prefix + "ban")) {
        if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un membre");
        }

        var ban = message.guild.member(message.mentions.users.first());
        if(!ban) {
            return message.channel.send("Le membre est inconnu :/");
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permissions pour ban");
        }
        ban.ban().then(member => {
            message.channel.send(`${member.user.username} est ban par @${message.author.username}`);
        })
    }

    if(message.content.startsWith(prefix + "clear")) {
        if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission !");

        let args = message.content.split(" ").slice(1);

        if(!args[0]) return message.channel.send("Tu dois mettre un nombre de messages a supprimé")
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`${args[0]} messages ont été suprimer !`);
        })
    }
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un membre");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Le membre est inconnu :/");
        }
        
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) {
            return message.channel.send("Je n'ai pas la permissions pour mute");
        }
        message.channel.overwritePermissions(mute, {SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute !`);
        })
    }

    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas la permission !");

        if(message.mentions.users.size === 0) {
            return message.channel.send("Vous devez mentionner un membre");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send("Le membre est inconnu :/");
        }
        
        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) {
            return message.channel.send("Je n'ai pas la permissions pour unmute");
        }
        message.channel.overwritePermissions(mute, {SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute !`);
        })
    }

var fs = require('fs');

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));

if (message.content.startsWith(prefix + "warn")){

if (message.channel.type === "dm") return;

var mentionned = message.mentions.users.first();

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

if(message.mentions.users.size === 0) {

  return message.channel.send("**:x: Vous n'avez mentionnée aucun utilisateur**");

}else{

    const args = message.content.split(' ').slice(1);

    const mentioned = message.mentions.users.first();

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          if (args.slice(1).length != 0) {

            const date = new Date().toUTCString();

            if (warns[message.guild.id] === undefined)

              warns[message.guild.id] = {};

            if (warns[message.guild.id][mentioned.id] === undefined)

              warns[message.guild.id][mentioned.id] = {};

            const warnumber = Object.keys(warns[message.guild.id][mentioned.id]).length;

            if (warns[message.guild.id][mentioned.id][warnumber] === undefined){

              warns[message.guild.id][mentioned.id]["1"] = {"raison": args.slice(1).join(' '), time: date, user: message.author.id};

            } else {

              warns[message.guild.id][mentioned.id][warnumber+1] = {"raison": args.slice(1).join(' '),

                time: date,

                user: message.author.id};

            }

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

message.delete();

            message.channel.send(':warning: | **'+mentionned.tag+' à été averti**');

message.mentions.users.first().send(`:warning: **Warn |** depuis **${message.guild.name}** donné par **${message.author.username}**\n\n**Raison:** ` + args.slice(1).join(' '))

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"warn <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

}



  if (message.content.startsWith(prefix+"seewarns")||message.content===prefix+"seewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

    const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size !== 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">") {

          try {

            if (warns[message.guild.id][mentioned.id] === undefined||Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

              return;

            }

          } catch (err) {

            message.channel.send("**"+mentioned.tag+"** n'a aucun warn :eyes:");

            return;

          }

          let arr = [];

          arr.push(`**${mentioned.tag}** a **`+Object.keys(warns[message.guild.id][mentioned.id]).length+"** warns :eyes:");

          for (var warn in warns[message.guild.id][mentioned.id]) {

            arr.push(`**${warn}** - **"`+warns[message.guild.id][mentioned.id][warn].raison+

            "**\" warn donné par **"+message.guild.members.find("id", warns[message.guild.id][mentioned.id][warn].user).user.tag+"** a/le **"+warns[message.guild.id][mentioned.id][warn].time+"**");

          }

          message.channel.send(arr.join('\n'));

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

          console.log(args);

        }

      } else {

        message.channel.send("Erreur mauvais usage: "+prefix+"seewarns <user> <raison>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }





  if (message.content.startsWith(prefix+"deletewarns")||message.content===prefix+"deletewarns") {

if (message.channel.type === "dm") return;

if(!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) return message.reply("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**").catch(console.error);

   const mentioned = message.mentions.users.first();

    const args = message.content.split(' ').slice(1);

    const arg2 = Number(args[1]);

    if (message.member.hasPermission('MANAGE_GUILD')){

      if (message.mentions.users.size != 0) {

        if (args[0] === "<@!"+mentioned.id+">"||args[0] === "<@"+mentioned.id+">"){

          if (!isNaN(arg2)) {

            if (warns[message.guild.id][mentioned.id] === undefined) {

              message.channel.send(mentioned.tag+" n'a aucun warn");

              return;

            } if (warns[message.guild.id][mentioned.id][arg2] === undefined) {

              message.channel.send("**:x: Ce warn n'existe pas**");

              return;

            }

            delete warns[message.guild.id][mentioned.id][arg2];

            var i = 1;

            Object.keys(warns[message.guild.id][mentioned.id]).forEach(function(key){

              var val=warns[message.guild.id][mentioned.id][key];

              delete warns[message.guild.id][mentioned.id][key];

              key = i;

              warns[message.guild.id][mentioned.id][key]=val;

              i++;

            });

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            if (Object.keys(warns[message.guild.id][mentioned.id]).length === 0) {

              delete warns[message.guild.id][mentioned.id];

            }

            message.channel.send(`Le warn de **${mentioned.tag}**\': **${args[1]}** a été enlevé avec succès!`);

            return;

          } if (args[1] === "tout") {

            delete warns[message.guild.id][mentioned.id];

            fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {if (err) console.error(err);});

            message.channel.send(`Les warns de **${mentioned.tag}** a été enlevé avec succès!`);

            return;

          } else {

            message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");

          }

        } else {

          message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");

        }

      } else {

       message.channel.send("Erreur mauvais usage: "+prefix+"deletewarns <utilisateur> <nombre>");

      }

    } else {

      message.channel.send("**:x: Vous n'avez pas la permission `Gérer le serveur` dans ce serveur**");

    }

  }

    if(!message.content.startsWith(prefix)) return;

    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()) {
        case "stats":

        var userCreateDate = message.author.createdAt.toString().split(" ");
        var msgauthor = message.author.id;

        var stats_embed = new Discord.RichEmbed()

        .setColor("#F1C40F")
        .setTitle(`Statistiques de l'utilisateur : ${message.author.username}`)
        .addField(`ID de l'utilisateur :id:`, msgauthor, true)
        .addField("Date de création de l'utilisateur :", userCreateDate[1] + ' ' + userCreateDate[2] + ' ' + userCreateDate[3])
        .setThumbnail(message.author.avatarURL)
        message.reply("Regarde tes messages privé tu viens de recevoir tes stats !")
        message.author.send({embed: stats_embed});
        console.log("stats")
        break;

        case "play":
        if (!args[1]) {
        message.channel.sendMessage("Tu dois m’indiquer un lien YouTube"); 
         return;
        }

        if(!message.member.voiceChannel) {

        message.channel.sendMessage(":x: Tu dois être dans un salon vocal"); 

        return;

        }


        if(!servers[message.guild.id]) servers[message.guild.id] = {

        queue: []

        };


        var server = servers[message.guild.id];


        server.queue.push(args[1]);

        if(!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {

        play(connection, message) 

        });

        break; 

        case "skip":

        if(!message.member.voiceChannel) {

        message.channel.sendMessage(":x: Tu dois être dans un salon vocal"); 

        return;

        }

        var server = servers[message.guild.id];

        if(server.dispatcher) server.dispatcher.end();

        break;

        case "stop":

        if(!message.member.voiceChannel) 
    
        return message.channel.send(":x: Tu dois être dans un salon vocal");

        message.member.voiceChannel.leave();

        break;
        }
});
