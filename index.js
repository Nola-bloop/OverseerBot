// Import required modules
import { exec } from 'child_process';
import dotenv from "dotenv"; dotenv.config();
import fs from 'fs';
import path from "path";
import { Client, GatewayIntentBits, Collection } from "discord.js";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import seerTempCommands from './temp-commands/seer.js'

// Create a new Discord client with message intent 
const client = new Client({ 
  intents: [ 
      GatewayIntentBits.Guilds,  
      GatewayIntentBits.GuildMessages,  
      GatewayIntentBits.MessageContent,
    ] 
}); 

//load commands
client.commands = new Collection();
const commandsPath = path.join(process.cwd(), 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = (await import(`file://${filePath}`)).default;

    client.commands.set(command.data.name, command);
}


// Bot is ready 
client.once('clientReady', () => { 
  console.log(`Logged in as ${client.user.tag}`); 
});

let connection;

//commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error!', flags: MessageFlags.Ephemeral });
  }
});

function logNewMessages(){
  //todo
}

function periodic(f) {
    (function loop() {
        let now = new Date();
        if (now.getHours() === 4 && now.getMinutes() === 0) {
            f();
        }
        now = new Date();                  // allow for time passing
        let delay = 60000 - (now.getTime() % 60000); // exact ms to next minute interval
        setTimeout(loop, delay);
    })();
}

function extractCommandName(input) {
    const match = input.trim().match(/^&(\S+)/);
    return match ? match[1] : null;
}


client.on('messageCreate', message => {
  if (message.content[0] === '&'){
    let command = extractCommandName(message.content)
    if (seerTempCommands[command]){
      seerTempCommands[command](message).then(() => {
        message.delete()
      })
    }
  }
})

// gotta update messages that change
client.on('messageUpdate', (oldMessage, newMessage) => {
  /*
  if (oldMessage.message.partial) {
    try {
      await oldMessage.message.fetch();
    } catch (error) {
      console.error('Failed to fetch:', error);
      return;
    }
  }
  if (newMessage.message.partial) {
    try {
      await newMessage.message.fetch();
    } catch (error) {
      console.error('Failed to fetch:', error);
      return;
    }
  }
  //safe to use either

  console.log("TODO - messageUpdate")
});

client.on('threadCreate', (thread) => {
  if (thread.message.partial) {
    try {
      await thread.message.fetch();
    } catch (error) {
      console.error('Failed to fetch:', error);
      return;
    }
  }
  //safe to use 

  console.log("TODO - threadCreate")
});

client.on('threadDelete', (thread) => {
  if (thread.message.partial) {
    try {
      await thread.message.fetch();
    } catch (error) {
      console.error('Failed to fetch:', error);
      return;
    }
  }
  //safe to use 

  console.log("TODO - threadDelete")
});

client.on('threadUpdate', (oldThread, newThread) => {
  if (oldThread.message.partial) {
    try {
      await oldThread.message.fetch();
    } catch (error) {
      console.error('Failed to fetch:', error);
      return;
    }
  }
  if (newThread.message.partial) {
    try {
      await newThread.message.fetch();
    } catch (error) {
      console.error('Failed to fetch:', error);
      return;
    }
  }
  //safe to use 

  console.log("TODO - threadUpdate")
  */
});




client.on("warn", info => {
  console.warn(`âš ï¸�  Warning: ${info}`);
});

client.on("error", error => {
  console.log(`â�Œ Client Error: ${error.message}`);
  console.log(error.stack);

  // You might want to send this to a logging service
  // But don't use await or complex async operations here
});

client.on("invalidated", () => {
  console.log('â�Œ Bot session invalidated!');
  console.log('The bot will now need to reconnect...');
  
  // Perform cleanup before process exit
  // Don't use this to restart - let process manager handle it
});

// Log in to Discord using token from .env 
client.login(process.env.DISCORD_TOKEN); 
