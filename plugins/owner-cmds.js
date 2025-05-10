const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const { exec } = require("child_process");
const axios = require('axios')
const os = require("os")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions');
const { writeFileSync } = require('fs');
const fs = require('fs');


let antilinkAction = "off"; // Default state
let warnCount = {}; // Track warnings per user

/*

cmd(
    { 
      pattern: "setprefix", 
      alias: ["prefix"], 
      desc: "Change bot prefix.", 
      category: "settings", 
      filename: __filename 
    }, 
    async (conn, mek, m, { from, args, isOwner, reply }) => { 
      // Check if the user is the owner
      if (!isOwner) return reply("*📛 Only the owner can use this command!*"); 
      
      // If no prefix is provided, return an error
      if (!args[0]) return reply("❌ Please provide a new prefix.");
      
      // Get the new prefix from the arguments
      const newPrefix = args[0]; 
      
      // Update the config.PREFIX with the new prefix
      config.PREFIX = newPrefix;
      
      // Save the updated config back to config.js file
      const configPath = './config.js';
      const updatedConfigContent = `module.exports = {\n  PREFIX: '${newPrefix}'\n};`;
  
      // Write the updated config back to the file
      fs.writeFileSync(configPath, updatedConfigContent, 'utf-8');
      
      // Inform the user about the prefix change
      reply(`*Prefix changed to:* ${newPrefix}`); 
      
      // Notify the owner that the bot will restart
      reply("*_DATABASE UPDATE HANS BYTE RESTARTING NOW...🚀_*"); 
      
      // Sleep for 1.5 seconds before restarting
      await sleep(1500);
      
      // Restart the bot using pm2
      exec("pm2 restart all", (err, stdout, stderr) => {
        if (err) {
          console.error(`Error restarting bot: ${stderr}`);
          reply(`❌ Error restarting bot: ${stderr}`);
          return;
        }
        // Notify that the bot has successfully restarted
        reply("*_HANS BYTE STARTED NOW...🚀_*");
      });
    }
  );
  */

//========mode

cmd({
    pattern: "mode",
    desc: "Set bot mode to private or public.",
    category: "settings",
    filename: __filename,
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 Only the owner can use this command!*");

    // Si aucun argument n'est fourni, afficher le mode actuel et l'usage
    if (!args[0]) {
        return reply(`📌 Current mode: *${config.MODE}*\n\nUsage: .mode private OR .mode public`);
    }

    const modeArg = args[0].toLowerCase();

    if (modeArg === "private") {
        config.MODE = "private";
        return reply("*_BOT MODE IS NOW SET TO PRIVATE ✅_*.");
    } else if (modeArg === "public") {
        config.MODE = "public";
        return reply("*_BOT MODE IS NOW SET TO PUBLIC ✅_*.")
        const {exec} = require("child_process")
reply("*_DATABASE UPDATE HANS BYTE RESTARTING NOW...🚀_*")
await sleep(1500)
exec("pm2 restart all")
reply("*_HANS BYTE STARTED NOW...🚀_*");
    } else {
        return reply("❌ Invalid mode. Please use `.mode private` or `.mode public`.");
    }
});

//--------------------------------------------
//  AUTO_TYPING
//--------------------------------------------

cmd({
    pattern: "auto_typing",
    alias: ["autotyping"],
    desc: "enable or disable auto-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_TYPING = "true";
        return reply("*_FAKETYPING  IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_TYPING = "false";
        return reply("*_FAKETYPING FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: ${config.PREFIX}auto_typing on/off*`);
    }
});
//--------------------------------------------
// ALWAYS_ONLINE COMMANDS
//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "always_online",
    alias: ["alwaysonline"],
    desc: "enable or disable auto-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ALWAYS_ONLINE = "true";
        return reply("*_ALWAYSONLINE  IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.ALWAYS_ONLINE = "false";
        return reply("*_ALWAYSONLINE FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: ${config.PREFIX}ᴀʟᴡᴀʏs_ᴏɴʟɪɴᴇ on/off*`);
    }
});
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto_reacording",
    alias: ["autorecording"],
    desc: "enable or disable auto-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_RECORDING = "true";
        return reply("*_FAKEREACORDING IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_RECORDING = "false";
        return reply("*_FAKEREACORDING FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: ${config.PREFIX}auto_recording ᴏɴ*`);
    }
});
//--------------------------------------------
// AUTO_VIEW_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "status_view",
    alias: ["auto_status_seen"],
    desc: "Enable or disable auto-viewing of statuses",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_VIEW_STATUS is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_SEEN = "true";
        return reply("*_AUTOREADSTATUS IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_SEEN = "false";
        return reply("*_AUTOREADSTATUS IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  ${config.PREFIX}status_view ᴏɴ/off*`);
    }
}); 
//--------------------------------------------
// AUTO_LIKE_STATUS COMMANDS
//--------------------------------------------
cmd({
    pattern: "status_react",
    alias: ["statusreact"],
    desc: "Enable or disable auto-liking of statuses",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Default value for AUTO_STATUS_REACT is "false"
    if (args[0] === "on") {
        config.AUTO_STATUS_REACT = "true";
        return reply("*_AUTOLIKESTATUS IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REACT = "false";
        return reply("*_AUTOLIKESTATUS IS NOW DISABLED._*❌");
    } else {
        return reply(`Example: ${config.PREFIX}status_react on/off`);
    }
});

//--------------------------------------------
//  READ-MESSAGE COMMANDS
//--------------------------------------------
cmd({
    pattern: "read_message",
    alias: ["autoread"],
    desc: "enable or disable readmessage.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.READ_MESSAGE = "true";
        return reply("*_READ MESSAGE FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.READ_MESSAGE = "false";
        return reply("*_READ MESSAGE FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`_example:  .READ_MESSAGE on_`);
    }
});
//--------------------------------------------
//  ANI-BAD COMMANDS
//--------------------------------------------
cmd({
    pattern: "anti_bad",
    alias: ["antibad"],
    desc: "enable or disable antibad.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ANTI_BAD = "true";
        return reply("*_ANTI BAD WORD IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.ANTI_BAD = "false";
        return reply("*_ANTI BAD WORD FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`_example:  .ANTI_BAD on_`);
    }
});
//--------------------------------------------
//  AUTO-STICKER COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto_sticker",
    alias: ["autosticker"],
    desc: "enable or disable auto-sticker.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STICKER = "true";
        return reply("*_AUTO-STICKER FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_STICKER = "false";
        return reply("*_AUTO-STICKER FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`_example:  .auto_sticker on_`);
    }
});
//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto_reply",
    alias: ["autoreply"],
    desc: "enable or disable auto-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REPLY = "true";
        return reply("*_AUTO-REPLY  IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_REPLY = "false";
        return reply("*_AUTO-REPLY FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: ${config.PREFIX}ᴀᴜᴛᴏ_ʀᴇᴘʟʏ ᴏɴ/off*`);
    }
});

//--------------------------------------------
//  AUTO-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto_voice",
    alias: ["autovoice"],
    desc: "enable or disable auto-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_VOICE = "true";
        return reply("*_AUTO-VOICE  IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_VOICE = "false";
        return reply("*_AUTO-VOICE FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: ${config.PREFIX}ᴀᴜᴛᴏ_ᴠᴏɪᴄᴇ ᴏɴ/off*`);
    }
});

//--------------------------------------------
//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
    pattern: "auto_react",
    alias: ["autoreact","areact"],
    desc: "Enable or disable the autoreact feature",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_REACT = "true";
        await reply("*_AUTOREACT FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_REACT = "false";
        await reply("*_AUTOREACT FEATURE IS NOW DISABLED._*❌");
    } else {
        await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: ${config.PREFIX}ᴀᴜᴛᴏ_ʀᴇᴀᴄᴛ ᴏɴ/off*`);
    }
});

//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
    pattern: "custom_reacts",
    alias: ["heartreact","dillreact"],
    desc: "Enable or disable the autoreact feature",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.CUSTOM_REACT = "true";
        await reply("*_HEARTREACT FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.CUSTOM_REACT = "false";
        await reply("*_HEARTREACT FEATURE IS NOW DISABLED._*❌");
    } else {
        await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: .${config.PREFIX}autorect ᴏɴ*`);
    }
});

//   AUTO-REACT COMMANDS
//--------------------------------------------
cmd({
    pattern: "anti_link",
    alias: ["antilink","anti"],
    desc: "Enable or disable the autoreact feature",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.ANTI_LINK = "true";
        await reply("*_OWNERREACT FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.ANTI_LINK = "false";
        await reply("*_ANTI_LINK FEATURE IS NOW DISABLED._*❌");
    } else {
        await reply(`*🫟 ᴇxᴀᴍᴘʟᴇ: ${config.PREFIX}Antilink_on/off*`);
    }
});
//--------------------------------------------
//  STATUS-REPLY COMMANDS
//--------------------------------------------
cmd({
    pattern: "status_reply",
    alias: ["autostatusreply"],
    desc: "enable or disable status-reply.",
    category: "settings",
    filename: __filename
},    
async (conn, mek, m, { from, args, isOwner, reply }) => {
    if (!isOwner) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    // Check the argument for enabling or disabling the anticall feature
    if (args[0] === "on") {
        config.AUTO_STATUS_REPLY = "true";
        return reply("*_STATUS-REPLY FEATURE IS NOW ENABLED._*☑️");
    } else if (args[0] === "off") {
        config.AUTO_STATUS_REPLY = "false";
        return reply("*_STATUS-REPLY FEATURE IS NOW DISABLED._*❌");
    } else {
        return reply(`*🫟 ᴇxᴀᴍᴘʟᴇ:  ${config.PREFIX}status_reply ᴏɴ/off*`);
    }
});
