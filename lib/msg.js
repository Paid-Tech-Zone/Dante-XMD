const { proto, downloadContentFromMessage, getContentType } = require('@whiskeysockets/baileys');
const fs = require('fs');

/**
 * Downloads media from a WhatsApp message object and saves it locally.
 * Supports images, videos, audio, stickers, and documents.
 * 
 * @param {Object} message - The WhatsApp message object containing media.
 * @param {string} [filename] - Optional filename (without extension).
 * @returns {Promise<Buffer>} - Resolves with the media file buffer.
 */
async function downloadMediaMessage(message, filename) {
  // Normalize message type for 'imageMessage' inside 'viewOnceMessage' or similar
  if (message.type === 'viewOnceMessage') {
    message.type = message.message.type;
  }

  // Image message
  if (message.type === 'imageMessage') {
    const fileName = filename ? `${filename}.jpg` : 'undefined.jpg';
    const stream = await downloadContentFromMessage(message.message, 'image');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    fs.writeFileSync(fileName, buffer);
    return fs.readFileSync(fileName);

  // Video message
  } else if (message.type === 'videoMessage') {
    const fileName = filename ? `${filename}.mp4` : 'undefined.mp4';
    const stream = await downloadContentFromMessage(message.message, 'video');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    fs.writeFileSync(fileName, buffer);
    return fs.readFileSync(fileName);

  // Audio message
  } else if (message.type === 'audioMessage') {
    const fileName = filename ? `${filename}.mp3` : 'undefined.mp3';
    const stream = await downloadContentFromMessage(message.message, 'audio');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    fs.writeFileSync(fileName, buffer);
    return fs.readFileSync(fileName);

  // Sticker message
  } else if (message.type === 'stickerMessage') {
    const fileName = filename ? `${filename}.webp` : 'undefined.webp';
    const stream = await downloadContentFromMessage(message.message, 'sticker');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    fs.writeFileSync(fileName, buffer);
    return fs.readFileSync(fileName);

  // Document message
  } else if (message.type === 'documentMessage') {
    // Try to extract extension from filename or default to .pdf
    let ext = 'pdf';
    if (message.message.fileName) {
      const parts = message.message.fileName.split('.');
      ext = parts.length > 1 ? parts.pop().toLowerCase() : 'pdf';
    }
    const fileName = filename ? `${filename}.${ext}` : `undefined.${ext}`;
    const stream = await downloadContentFromMessage(message.message, 'document');
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    fs.writeFileSync(fileName, buffer);
    return fs.readFileSync(fileName);

  } else {
    throw new Error(`Unsupported message type: ${message.type}`);
  }
}

/**
 * Enhances a raw WhatsApp message object with useful properties and helper methods.
 * 
 * @param {Object} client - The Baileys client instance.
 * @param {Object} rawMessage - The raw WhatsApp message object.
 * @returns {Object} - Enhanced message object with helper methods.
 */
function sms(client, rawMessage) {
  // If the message is a stub (e.g., ephemeral), get the actual message
  if (rawMessage.message) {
    rawMessage.type = getContentType(rawMessage.message);
    rawMessage.content = rawMessage.message[rawMessage.type];

    // If it's a viewOnceMessage, unwrap the inner message type
    if (rawMessage.type === 'viewOnceMessage') {
      rawMessage.content.type = getContentType(rawMessage.message.viewOnceMessage.message);
      rawMessage.content = rawMessage.message.viewOnceMessage.message[rawMessage.content.type];
    }
  }

  // Basic message properties
  rawMessage.id = rawMessage.key?.id || '';
  rawMessage.from = rawMessage.key?.remoteJid || '';
  rawMessage.isGroup = rawMessage.from.endsWith('@g.us');
  rawMessage.sender = rawMessage.key?.fromMe
    ? client.user.id.split(':')[0] + '@s.whatsapp.net'
    : rawMessage.participant || rawMessage.from;

  // Extract mentions if any
  const mentionedJid = rawMessage.content?.contextInfo?.mentionedJid || [];
  rawMessage.mentionedUsers = Array.isArray(mentionedJid) ? mentionedJid : [mentionedJid];

  // Extract text content for convenience
  if (rawMessage.type === 'conversation') {
    rawMessage.text = rawMessage.content?.conversation || '';
  } else if (rawMessage.type === 'extendedTextMessage') {
    rawMessage.text = rawMessage.content?.text || rawMessage.content?.caption || '';
  } else if (rawMessage.type === 'imageMessage' || rawMessage.type === 'videoMessage') {
    rawMessage.text = rawMessage.content?.caption || '';
  } else if (rawMessage.type === 'documentMessage') {
    rawMessage.text = rawMessage.content?.fileName || '';
  } else if (rawMessage.type === 'buttonsResponseMessage') {
    rawMessage.text = rawMessage.content?.selectedButtonId || '';
  } else {
    rawMessage.text = '';
  }

  // Quoted message (if reply)
  if (rawMessage.content?.contextInfo?.quotedMessage) {
    const quoted = rawMessage.content.contextInfo.quotedMessage;
    const quotedType = getContentType(quoted);
    rawMessage.quoted = {
      id: rawMessage.content.contextInfo.stanzaId,
      from: rawMessage.content.contextInfo.participant || rawMessage.from,
      type: quotedType,
      content: quoted[quotedType],
      // Helper methods for quoted message
      download: (filename) => downloadMediaMessage(rawMessage.quoted, filename),
      delete: () => client.sendMessage(rawMessage.from, { delete: { remoteJid: rawMessage.from, fromMe: true, id: rawMessage.quoted.id } }),
      react: (emoji) => client.sendMessage(rawMessage.from, {
        react: {
          text: emoji,
          key: {
            remoteJid: rawMessage.from,
            fromMe: true,
            id: rawMessage.quoted.id,
            participant: rawMessage.quoted.from,
          }
        }
      })
    };
  } else {
    rawMessage.quoted = null;
  }

  // Helper method: reply with text
  rawMessage.reply = (text, to = rawMessage.from, options = { mentions: [rawMessage.sender] }) => {
    return client.sendMessage(to, { text, contextInfo: { mentionedJid: options.mentions } }, { quoted: rawMessage });
  };

  // Helper method: reply with image + caption
  rawMessage.replyImg = (buffer, caption = '', to = rawMessage.from, options = { mentions: [rawMessage.sender] }) => {
    return client.sendMessage(to, { image: buffer, caption, contextInfo: { mentionedJid: options.mentions } }, { quoted: rawMessage });
  };

  // Helper method: reply with video + caption
  rawMessage.replyVid = (buffer, caption = '', to = rawMessage.from, options = { mentions: [rawMessage.sender] }) => {
    return client.sendMessage(to, { video: buffer, caption, gifPlayback: false, contextInfo: { mentionedJid: options.mentions } }, { quoted: rawMessage });
  };

  // Helper method: reply with audio
  rawMessage.replyAud = (buffer, to = rawMessage.from, options = { mentions: [rawMessage.sender], ptt: false }) => {
    return client.sendMessage(to, { audio: buffer, ptt: options.ptt, mimetype: 'audio/mpeg', contextInfo: { mentionedJid: options.mentions } }, { quoted: rawMessage });
  };

  // Helper method: reply with sticker
  rawMessage.replyS = (buffer, to = rawMessage.from, options = { mentions: [rawMessage.sender] }) => {
    return client.sendMessage(to, { sticker: buffer, contextInfo: { mentionedJid: options.mentions } }, { quoted: rawMessage });
  };

  // Helper method: reply with document
  rawMessage.replyDoc = (buffer, to = rawMessage.from, options = { mentions: [rawMessage.sender], fileName: 'file.pdf', mimetype: 'application/pdf' }) => {
    return client.sendMessage(to, { document: buffer, fileName: options.fileName, mimetype: options.mimetype, contextInfo: { mentionedJid: options.mentions } }, { quoted: rawMessage });
  };

  // Helper method: send contact card
  rawMessage.replyContact = (name, phone, to = rawMessage.from) => {
    const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nTEL;type=CELL;type=VOICE;waid=${phone}:${phone}\nEND:VCARD`;
    return client.sendMessage(to, { contacts: { displayName: name, contacts: [{ vcard }] } }, { quoted: rawMessage });
  };

  // Helper method: react to message
  rawMessage.react = (emoji) => {
    return client.sendMessage(rawMessage.from, { react: { text: emoji, key: rawMessage.key } });
  };

  // Helper method: download media from this message
  rawMessage.download = (filename) => downloadMediaMessage(rawMessage, filename);

  return rawMessage;
}

module.exports = {
  sms,
  downloadMediaMessage
};
