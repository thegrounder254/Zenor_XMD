import config from '../../config.cjs';

const jidCommand = async (m, Matrix) => {
  try {
    const prefix = config.PREFIX || '/';
    const cmd = m.body.startsWith(prefix) 
      ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() 
      : '';

    const supportedCommands = ["jid", "id", "getjid"];

    if (supportedCommands.includes(cmd)) {
      // Check if we're in a group chat or personal chat
      const isGroup = m.from.endsWith('@g.us');
      
      // Get the appropriate JID
      let targetJid;
      let jidType;
      
      if (isGroup) {
        // Group chat - use the group JID
        targetJid = m.from;
        jidType = "Group";
        
        // Also get the sender's personal JID in group context
        const senderJid = m.sender || m.participant;
        
        const responseText = 
          `👥 *${jidType} JID Information*\n\n` +
          `📱 *Your Personal JID:*\n\`\`\`${senderJid}\`\`\`\n` +
          `👥 *Group JID:*\n\`\`\`${targetJid}\`\`\`\n` +
          `💬 *Chat Type:* ${jidType} Chat\n` +
          `👤 *Requested by:* @${m.sender.split('@')[0]}\n\n` +
          `📌 *Usage:* Use this JID for bot commands that require specific IDs`;
        
        await Matrix.sendMessage(m.from, {
          text: responseText,
          mentions: [m.sender]
        }, { quoted: m });
        
      } else {
        // Personal chat
        targetJid = m.sender; // Already includes @s.whatsapp.net
        jidType = "Personal";
        
        const responseText = 
          `👤 *${jidType} JID Information*\n\n` +
          `📱 *Your JID:*\n\`\`\`${targetJid}\`\`\`\n` +
          `💬 *Chat Type:* ${jidType} Chat\n` +
          `👤 *User:* @${m.sender.split('@')[0]}\n\n` +
          `📌 *Usage:* This is your unique WhatsApp identifier`;
        
        await Matrix.sendMessage(m.from, {
          text: responseText,
          mentions: [m.sender]
        }, { quoted: m });
      }
      
      // Add reaction for visual feedback
      await m.React('✅');
      
    }
  } catch (error) {
    console.error('Error in jid command:', error);
    
    // Error response
    await Matrix.sendMessage(m.from, {
      text: `❌ *Error fetching JID*\n\nAn error occurred while fetching the JID information.\nError: ${error.message}`
    }, { quoted: m });
    
    await m.React('❌');
  }
};

export default jidCommand;
