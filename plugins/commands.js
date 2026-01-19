import config from '../config.cjs';

const commands = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  if (cmd === "commands" || cmd === "help" || cmd === "menu") {
    // Random decoration emojis
    const decorations = ['✦', '✦', '✦', '✦', '✦', '✦', '✦', '✦'];
    const titleEmojis = ['📜', '📖', '🗂️', '📚', '📋', '📓', '🎮', '⚙️'];
    const categoryEmojis = {
      general: '🛠️',
      fun: '🎮',
      utility: '⚙️',
      media: '🖼️',
      group: '👥',
      owner: '👑',
      tools: '🔧'
    };

    const decoration = decorations[Math.floor(Math.random() * decorations.length)];
    const titleEmoji = titleEmojis[Math.floor(Math.random() * titleEmojis.length)];

    // Command categories
    const commandCategories = {
      '🛠️ GENERAL': [
        { command: 'ping', description: 'Check bot response time' },
        { command: 'commands', description: 'Show this command list' },
        { command: 'help', description: 'Show help menu' },
        { command: 'menu', description: 'Show command menu' },
        { command: 'status', description: 'Check bot status' },
        { command: 'owner', description: 'Contact bot owner' },
        { command: 'support', description: 'Get support group info' }
      ],
      
      '🎮 FUN': [
        { command: 'meme', description: 'Get random meme' },
        { command: 'joke', description: 'Get random joke' },
        { command: 'quote', description: 'Get inspirational quote' },
        { command: 'fact', description: 'Get random fact' },
        { command: 'coinflip', description: 'Flip a coin' },
        { command: 'dice', description: 'Roll a dice' },
        { command: '8ball', description: 'Magic 8-ball answers' }
      ],
      
      '⚙️ UTILITY': [
        { command: 'weather', description: 'Check weather in city' },
        { command: 'time', description: 'Get current time' },
        { command: 'calc', description: 'Calculator' },
        { command: 'currency', description: 'Currency converter' },
        { command: 'reminder', description: 'Set a reminder' },
        { command: 'timer', description: 'Set a timer' },
        { command: 'sticker', description: 'Create sticker from image' }
      ],
      
      '🖼️ MEDIA': [
        { command: 'play', description: 'Play music' },
        { command: 'yt', description: 'Download YouTube video' },
        { command: 'img', description: 'Search images' },
        { command: 'gif', description: 'Search GIFs' },
        { command: 'quoteimg', description: 'Create quote image' },
        { command: 'toimg', description: 'Convert sticker to image' }
      ],
      
      '👥 GROUP': [
        { command: 'add', description: 'Add user to group' },
        { command: 'kick', description: 'Remove user from group' },
        { command: 'promote', description: 'Promote user to admin' },
        { command: 'demote', description: 'Demote admin to member' },
        { command: 'tagall', description: 'Mention all members' },
        { command: 'groupinfo', description: 'Show group info' },
        { command: 'setdesc', description: 'Set group description' }
      ],
      
      '🔧 TOOLS': [
        { command: 'qr', description: 'Generate QR code' },
        { command: 'shorten', description: 'Shorten URL' },
        { command: 'translate', description: 'Translate text' },
        { command: 'define', description: 'Dictionary definition' },
        { command: 'covid', description: 'COVID-19 stats' },
        { command: 'lyrics', description: 'Get song lyrics' }
      ],
      
      '👑 OWNER': [
        { command: 'eval', description: 'Execute code' },
        { command: 'exec', description: 'Execute shell command' },
        { command: 'broadcast', description: 'Broadcast message' },
        { command: 'setprefix', description: 'Change bot prefix' },
        { command: 'restart', description: 'Restart bot' },
        { command: 'shutdown', description: 'Shutdown bot' }
      ]
    };

    // Create the formatted message
    let message = `${decoration.repeat(14)}\n`;
    message += `       *${titleEmoji} ${config.BOT_NAME || 'BOT'} COMMANDS ${titleEmoji}*\n`;
    message += `${decoration.repeat(14)}\n\n`;
    message += `*📌 Prefix:* ${prefix}\n`;
    message += `*👤 Total Commands:* ${Object.values(commandCategories).flat().length}\n`;
    message += `*📅 Last Updated:* ${new Date().toLocaleDateString()}\n\n`;
    
    // Add each category
    Object.entries(commandCategories).forEach(([category, commandsList]) => {
      const categoryEmoji = category.match(/[🛠️🎮⚙️🖼️👥👑🔧]/)?.[0] || '📌';
      const categoryName = category.replace(/[🛠️🎮⚙️🖼️👥👑🔧]\s*/, '');
      
      message += `╭─❏ *${categoryEmoji} ${categoryName}*\n`;
      
      commandsList.forEach((cmd, index) => {
        const isLast = index === commandsList.length - 1;
        const lineChar = isLast ? '└─' : '├─';
        message += `${lineChar} *${prefix}${cmd.command}* - ${cmd.description}\n`;
      });
      
      message += `╰───────────\n\n`;
    });
    
    message += `${decoration.repeat(14)}\n`;
    message += `📝 *Usage:* ${prefix}<command>\n`;
    message += `Example: ${prefix}ping\n`;
    message += `${decoration.repeat(14)}\n`;
    message += `💡 *Tip:* Use ${prefix}help <command> for detailed info`;

    await Matrix.sendMessage(m.from, {
      text: message,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '',
          newsletterName: "Bot Commands",
          serverMessageId: 999
        }
      }
    }, { quoted: m });
    
    // Add a reaction
    const reactionEmojis = ['📚', '📖', '📜', '🎯', '⭐', '💫', '✨', '🌟'];
    const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
    await m.React(reactionEmoji);
  }
};

export default commands;
