﻿const { Client } = require('discord.js-selfbot-v11'),
    Enmap = require('enmap'),
    fs = require('fs');

const RPC = require('./rpcModule'),
    rpc = new RPC()

const client = new Client(),
    { token, prefix } = require('./config.json')

client.commands = new Enmap();
require('colors')

// Handling errors (hiding)
process.on('unhandledRejection', e => {});
process.on('uncaughtException', e => {});
process.on('uncaughtRejection', e => {});
process.warn = () => {};

client.on("error", (e) => {});
client.on("warn", (e) => {});

// POG (workaround)
function nullReturn() {
    return
}

(async function() {
    console.clear()
    process.title = 'SacrificeNuker - Loading...'
    console.log(`

    ██╗      ██████╗  █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
    ██║     ██╔═══██╗██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
    ██║     ██║   ██║███████║██║  ██║██║██╔██╗ ██║██║  ███╗
    ██║     ██║   ██║██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
    ███████╗╚██████╔╝██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
    ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                        `.magenta);

    client.on('ready', async() => {
        console.clear()
        rpc.run()
        process.title = `[${client.user.tag}] by sacrifice#0007`
        console.log(`
  

          ██████  ▄▄▄       ▄████▄   ██▀███   ██▓  █████▒██▓ ▄████▄  ▓█████ 
        ▒██    ▒ ▒████▄    ▒██▀ ▀█  ▓██ ▒ ██▒▓██▒▓██   ▒▓██▒▒██▀ ▀█  ▓█   ▀ 
        ░ ▓██▄   ▒██  ▀█▄  ▒▓█    ▄ ▓██ ░▄█ ▒▒██▒▒████ ░▒██▒▒▓█    ▄ ▒███   
          ▒   ██▒░██▄▄▄▄██ ▒▓▓▄ ▄██▒▒██▀▀█▄  ░██░░▓█▒  ░░██░▒▓▓▄ ▄██▒▒▓█  ▄ 
        ▒██████▒▒ ▓█   ▓██▒▒ ▓███▀ ░░██▓ ▒██▒░██░░▒█░   ░██░▒ ▓███▀ ░░▒████▒
        ▒ ▒▓▒ ▒ ░ ▒▒   ▓▒█░░ ░▒ ▒  ░░ ▒▓ ░▒▓░░▓   ▒ ░   ░▓  ░ ░▒ ▒  ░░░ ▒░ ░
        ░ ░▒  ░ ░  ▒   ▒▒ ░  ░  ▒     ░▒ ░ ▒░ ▒ ░ ░      ▒ ░  ░  ▒    ░ ░  ░
        ░  ░  ░    ░   ▒   ░          ░░   ░  ▒ ░ ░ ░    ▒ ░░           ░   
              ░        ░  ░░ ░         ░      ░          ░  ░ ░         ░  ░
                           ░                                ░
            
            [connected in: ${client.user.tag}]                  are you ready to die?  
        `.italic.brightMagenta)
        console.log(`
            ┬ ┬┌─┐┬  ┌─┐
            ├─┤├┤ │  ├─┘
            ┴ ┴└─┘┴─┘┴  
            ${prefix}kill       owns the server
            ${prefix}banall    ban all members
            ${prefix}chn       create channels
            ${prefix}everyone  raid everyone ping
            ${prefix}prune     purge inactive members
        `.red.bold.italic)
    })

    // Reading commands directory and defining on client
    fs.readdir("./cmds/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./cmds/${file}`);
            let commandName = file.split(".")[0];
            client.commands.set(commandName, props);
        });
    });

    client.on('message', async(msg) => {
        if (msg.content.indexOf(prefix) !== 0) return;

        const args = msg.content.slice(prefix.length).trim().split(/ +/g),
            command = args.shift().toLowerCase(),
            cmd = client.commands.get(command);

        if (msg.author.id !== client.user.id) return;
        cmd ? cmd.run(client, msg, args) : nullReturn() // case command exists, run - else, return null
    })

    client.login(token).catch(() => {
        console.log(` 
         ██████████                                       
        ░░███░░░░░█                                       
         ░███  █ ░  ████████  ████████   ██████  ████████ 
         ░██████   ░░███░░███░░███░░███ ███░░███░░███░░███
         ░███░░█    ░███ ░░░  ░███ ░░░ ░███ ░███ ░███ ░░░ 
         ░███ ░   █ ░███      ░███     ░███ ░███ ░███     
         ██████████ █████     █████    ░░██████  █████    
        ░░░░░░░░░░ ░░░░░     ░░░░░      ░░░░░░  ░░░░░     
                                                          
               verify the token on config.json                                      
        `.italic.bold);
    });
})();