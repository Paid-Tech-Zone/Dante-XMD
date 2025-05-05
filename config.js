/**


 Copyright (C) 2025.
 Licensed under the  GPL-3.0 License;
 You may not sell this script.
 It is supplied in the hope that it may be useful.
 * @project_name : Free Bot script
 * @author : Tcroneb Hackx<https://github.com/paidtechzone>
 * @description : A Multi-functional whatsapp bot script.
 * @version 3.0.0
 **/


const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID || "{"noiseKey":{"private":{"type":"Buffer","data":"cDiqlIJG1Og1R9E8OycyvJX+WFDv1BXM/PuSLF0pwnk="},"public":{"type":"Buffer","data":"PNeJiKEMk9JdnyL1gHSICxu2Pn5PleT0bLBHOJOVg24="}},"pairingEphemeralKeyPair":{"private":{"type":"Buffer","data":"IFaS68fsv100kHmC1lk/5f0H21T2zcG7bcrreqxKb3c="},"public":{"type":"Buffer","data":"vSnQN6CeV6pTtY5/54CQwlQM2iMxSQy92BXP4nrwBU4="}},"signedIdentityKey":{"private":{"type":"Buffer","data":"6AUsDXrSt//fZvdH7Q9k1iRZ8TNFuUtuWE65T8k9wGo="},"public":{"type":"Buffer","data":"NDQga6NLpa6AWm2MqbzTLGIj/oqRQbBLY1o9r3d21xA="}},"signedPreKey":{"keyPair":{"private":{"type":"Buffer","data":"cJvsoleqX+2ZaZlwzVws0yHmncbpkH8rJbYJyEhkXmQ="},"public":{"type":"Buffer","data":"Q9xU4ROI17tgcBr8W8Pi/aAQoHyndP2vfSCODl6ANQU="}},"signature":{"type":"Buffer","data":"9tJsF0fcGwxze3xuC/3StzDeNS1uIMvkgflncAzShGNauvGZw3sC/daqIQMhCPK9L6k4POKvEMOHtXzYgHXrAA=="},"keyId":1},"registrationId":202,"advSecretKey":"l0eeBiQNGJw0+iJHeQ1JmWm9hM1+l1wHSUl8n4zjCHg=","processedHistoryMessages":[],"nextPreKeyId":31,"firstUnuploadedPreKeyId":31,"accountSyncCounter":0,"accountSettings":{"unarchiveChats":false},"deviceId":"gVsNpLY2TUWxVki6ehdatA","phoneId":"1901a2b9-4713-43c1-a37c-c8f49484ce74","identityId":{"type":"Buffer","data":"U3xadV4bCC8FdKr0lyv312V3f8U="},"registered":true,"backupToken":{"type":"Buffer","data":"/0TXHvfVHpH++NZkC4ie77wnJqs="},"registration":{},"pairingCode":"NGCFYMY5","me":{"id":"263788533181:55@s.whatsapp.net","name":"𝕋𝐜𝐫𝐨𝐧𝐞𝐁 ᕼ𝗮𝗰𝗸𝘅"},"account":{"details":"COjTlugFEMX74cAGGAggACgA","accountSignatureKey":"M0a6ENip/u3DAiOeDqP5ErX1E5xbkUzh7mSCEye+yiA=","accountSignature":"iHf/efvAzkWG8eTjti/GESqjsI3b0RQ1FPbd+KdXFxbQ74JBahaQvUYCaefASdF1vCgHBVxvjFkrPVxtVHlqCQ==","deviceSignature":"4aB1Fard1/otLxTRB+0EgugIJxslLbTQPrOz5A5W5WBFdzWiLwvY+rupPD+Dhw/BXcOAjKBfEalcx74OZtT9Bw=="},"signalIdentities":[{"identifier":{"name":"263788533181:55@s.whatsapp.net","deviceId":0},"identifierKey":{"type":"Buffer","data":"BTNGuhDYqf7twwIjng6j+RK19ROcW5FM4e5kghMnvsog"}}],"platform":"smba","lastAccountSyncTimestamp":1746435538,"myAppStateKeyId":"AAAAANyE"}",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "public",
AUTO_VOICE: process.env.AUTO_VOICE || "false",
AUTO_STICKER: process.env.AUTO_STICKER || "false",
AUTO_REPLY: process.env.AUTO_REPLY || "false",
ALIVE_IMG: process.env.ALIVE_IMG || "https://i.ibb.co/wrQ3Ndrs/IMG-20250420-WA0014.jpg",
MENU_IMG: process.env.MENU_IMG || "https://i.ibb.co/Mx0JFLWB/IMG-20250420-WA0011.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "_Hi 💁🏽 How Can I Assist You. Am alive Now._",
ANTI_LINK: process.env.ANTI_LINK || "true",
ANTI_BAD: process.env.ANTI_BAD || "true",
PREFIX: process.env.PREFIX || ".",
FAKE_RECORDING: process.env.FAKE_RECORDING || "false",
FAKE_TYPING: process.env.FAKE_TYPING || "false",
ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
CURRENT_STATUS: process.env.CURRENT_STATUS || "true",
AUTO_REACT: process.env.AUTO_REACT || "false",
HEART_REACT: process.env.HEART_REACT || "false",
OWNER_REACT: process.env.OWNER_REACT || "false",
BOT_NAME: process.env.BOT_NAME || "『DANTE XMD 』",
OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};
