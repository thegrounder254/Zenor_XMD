const fs = require("fs");
require("dotenv").config();

const config = {
  /* [SESSION CONFIGURATION] */
  SESSION_ID: process.env.SESSION_ID || "Gifted~H4sIAAAAAAAAA5VUy27jNhT9lYJbG7UetiQLCFA9bEtx5LdlycUsGImSGckSTVK25YG/oZsAXWXTRYGuuuiP5RMKJZPJLNppyhVfOPfce869n0FRYobGqAb6Z0AoPkKOmi2vCQI6MKskQRS0QQw5BDrAw+T+sjkvQtg5y9lqidec3HvdzaTcSLvZ2tD4yPOmwfokCTfg2gakus9x9B1AT5taUSsUOj00M1axeCR2Jq8ua6FfOqGSkiEfs4EgXbpieAOuDSLEFBfpgOzQHlGYj1E9g5h+jL4wKqPjPvLYZFs6zna5ERMjQePLftyyYOtu0QmoEiLTHBfRx+g7Pr/VCCWBeXGHvijUIVmUCxb4PHJqVZtDoZItF5fFvPtKn+G0QLEbo4JjXn+47ofhbDCNvIeOX7acUBQ28lLlnrNrEXcshf5G9oVKyyxTHXQ/Rnxxd5iOBUY15TTZ+UYIzWM6UfpqOlIQy9042Usdi01V75x+S3xG37yS/Z+6H0xs7U5LVZpoJ6+M+YAe5o6WLT1VvZOg5ds2Q5Hs58c8/Bh9sR8YRnCfb3y/rM0eR9sSX2SWqxBmNjc7E4imiRWqxSB7pw95Rb/HUlW6VcKJmGpOFp7QXIydI++m82mh3nZnrifsF0StV2MvimxxwA5ajrAVC+4kZ7eWuFX921EoLqZkRIRbokTrlXCZmsbNS0YZqt0Y6OK1DShKMeMUclwWzZ0itwGMj0sUUcRfqguitFdVE+YHad8wmKPu2KkTU27fhfP6SDqpQOlA2UBR25xuQBsQWkaIMRQ7mPGS1h5iDKaIAf3nT21QoDN/1a2JJottkGDK+LqoSF7C+E3Ut0cYRWVV8GVdRFazQRTowvs14hwXKWvKWBWQRjt8RNYOcgb0BOYMfU0QURQDndMKfW1aq4ybuodTI9gEkgDaYP+iB46BDqReV+2LWk9QJFWXlJ/Yj6cGFhLyY4E4aIMCNr/B89PjL89Pj78/Pz3+8cPz0+Ovz0+Pfz4/Pf72/PT4F2iD/AVNFPuypmqSoopKX1QawObh+jWRJm6MOMQ5AzqwXBlKmmEPpquQa2w0MrzUsFIDvCf+ZqBXhYICB+4YbzseGk5X1a3teSQmObEJHbko3y97ycEn6F4eZjf/AAJ0UK1bRsHsh1On1SPEXgVRb77uzR7cQScjfCIcZSu6wKIayI5Rqb7ozVeX1VSiYh9Vx2PfzCplEnnlMKRhbc3tyd25VOzGbW0QoyOO0LfBhJqPp0M0v/iJExwEeXbadwVjtZ5VxsxYj8NBYa7uHvD87szHeartl6tqWmZs0Ss9M2pJ5cNR2rQOhdG5VCbV/If1Q2IZp1drv7RW/mWk4RfXNZI2xwSjlwnxRbr/lPiVeONE4dr+BuPLzPmXvjX9XjevrXKfXJzdKlPx/GKPA7iFcwWesUO2WRUoOQz2/fMWXK+f2oDkkCcl3QMdsP09BG1Ay6rxtVsk5XciWYbr2vN02KSdQ8aN915Z4T1iHO4J0EVV0TRRVKT+668ZLYkD2Q7oYLbJembj+9ogZMkhf+s8YDTL8mxw/RtvdA1TlAcAAA==",
  SESSION_NAME: process.env.SESSION_NAME || "Gifted~",
  
  /* [BOT BASIC CONFIG] */
  PREFIX: process.env.PREFIX || '.',
  MODE: process.env.MODE || "public",
  BOT_NAME: process.env.BOT_NAME || "Zenor_XMD",
  BOT_STATUS: process.env.BOT_STATUS || "online",
  CAPTION: process.env.CAPTION || "Made By William",
  OWNER_NAME: process.env.OWNER_NAME || "William",
  TIME_ZONE: process.env.TIME_ZONE || "Africa/Nairobi", // Timezone for timestamps

  /* [OWNER CONFIGURATION] */
  ANTI_BAD_WORD: process.env.ANTI_BAD_WORD === "true" || true,
  OWNER_NUMBER: process.env.OWNER_NUMBER || "218942841878",
  SUDO_NUMBER: process.env.SUDO_NUMBER || "254740271632",
  CHANNEL_JID: process.env.CHANNEL_JID || "120363299029326322@newsletter",
  CHANNEL_NAME: process.env.CHANNEL_NAME || "Carl",
  CHANNEL_LINK: "https://whatsapp.com/channel/your_channel_id", // Channel invite link
  STATUS_BG_COLOR: "#DF2E38", // Status background color
  
  /* [STATUS FEATURES] */
  AUTO_STATUS: process.env.AUTO_STATUS === "true" || true,
  STATUS_TEXT: process.env.STATUS_TEXT || "Hey Guys this is the Best bot Master\nFollow his channel:\nhttps://whatsapp.com/channel/0029Vajvy2kEwEjwAKP4SI0x",
  STATUS_IMAGE_URL: process.env.STATUS_IMAGE_URL || "",
  AUTOLIKE_STATUS: process.env.AUTOLIKE_STATUS === "true" || true,
  AUTOLIKE_EMOJI: process.env.AUTOLIKE_EMOJI || "❤",
  AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "true",
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || 'Status Viewed',
  
  /* [AUTOMATION FEATURES] */
  AUTO_REACT: process.env.AUTO_REACT === "true" || false,
  AUTO_REPLY: process.env.AUTO_REPLY === "true" || false,
  AUTO_BIO: process.env.AUTO_BIO === "true" || true,
  AUTO_READ: process.env.AUTO_READ === "true" || false,
  AUTO_TYPING: process.env.AUTO_TYPING === "true" || false,
  AUTO_RECORDING: process.env.AUTO_RECORDING === "true" || false,
  ANTI_STICKER: process.env.ANTI_STICKER === "true" || true,
  AUTO_DL: process.env.AUTO_DL === "true" || false,
  
  /* [REACTION SETTINGS] */
  SLIKE: process.env.SLIKE === "true" || true,
  SLIKE_EMOJIS: process.env.SLIKE_EMOJIS ? process.env.SLIKE_EMOJIS.split(',') : ['❤', '🔥', '😍', '💯', '✨', '😎'],
  
  /* [SECURITY FEATURES] */
  AUTO_BLOCK: process.env.AUTO_BLOCK === "true" || true,
  ANTI_LEFT: process.env.ANTI_LEFT === "true" || true,
  ANTI_GROUP_LEAVE: process.env.ANTI_GROUP_LEAVE || "true",
  ANTI_DELETE: process.env.ANTI_DELETE === "true" || true,
  BLOCKED_PREFIXES: process.env.BLOCKED_PREFIXES ? process.env.BLOCKED_PREFIXES.split(',') : ['234', '263', '91'],
  
  /* [CHAT FEATURES] */
  CHAT_BOT: process.env.CHAT_BOT === "true" || true,
  CHAT_BOT_MODE: process.env.CHAT_BOT_MODE || "self",
  WELCOME: process.env.WELCOME === "true" || true,
  NEW_CMD: process.env.NEW_CMD || "ᴀᴅᴅᴠᴀʀ\n│ sᴜᴅᴏ│ Marisel",
  
  /* [ADVANCED SETTINGS] */
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE === "true" || false,
  OWNER_REACT: process.env.OWNER_REACT === "true" || false,
  REJECT_CALL: process.env.REJECT_CALL === "true" || false,
  NOT_ALLOW: process.env.NOT_ALLOW === "true" || true,
  DELETED_MESSAGES_CHAT_ID: process.env.DELETED_MESSAGES_CHAT_ID || "254740007567@s.whatsapp.net",
  
  /* [API KEYS] */
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  
  /* [DEBUGGING] */
  PLUGIN_LOG: process.env.PLUGIN_LOG === "true" || true,
  PLUGIN_SUCCESS_EMOJI: process.env.PLUGIN_SUCCESS_EMOJI || '✔',
  PLUGIN_FAIL_EMOJI: process.env.PLUGIN_FAIL_EMOJI || '❌',
  
  /* [NEWSLETTER CONFIG] */
  FORWARDED_SCORE: 999,
  SERVER_MESSAGE_ID: 143,
  
  /* [DEPLOYMENT NOTIFICATION] */
  DEPLOYMENT_NOTIFY: process.env.DEPLOYMENT_NOTIFY === "true" || true
};

// Export configuration
module.exports = config;
