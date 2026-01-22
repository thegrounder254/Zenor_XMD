import { serialize, decodeJid } from '../lib/Serializer.js';
import path from 'path';
import fs from 'fs/promises';
import config from '../config.cjs';
import { handleAntilink } from './antilink.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getGroupAdmins = (participants = []) => {
    return participants
        .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
        .map(p => p.id);
};

const Handler = async (chatUpdate, sock, logger) => {
    try {
        if (!chatUpdate.messages || !chatUpdate.messages[0]) return;

        const m = serialize(chatUpdate.messages[0], sock, logger);
        if (!m.message) return;

        const body = m.body || '';

        const PREFIX = /^[\\/!#.]/;
        if (!PREFIX.test(body)) return; // 🔑 Ignore non-commands

        const prefix = body.match(PREFIX)[0];
        const cmd = body.slice(prefix.length).trim().split(/\s+/)[0].toLowerCase();
        const text = body.slice(prefix.length + cmd.length).trim();

        const participants = m.isGroup
            ? (await sock.groupMetadata(m.from)).participants
            : [];

        const groupAdmins = m.isGroup ? getGroupAdmins(participants) : [];
        const botNumber = decodeJid(sock.user.id);
        const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';

        const isBotAdmins = m.isGroup && groupAdmins.includes(botNumber);
        const isAdmins = m.isGroup && groupAdmins.includes(m.sender);
        const isCreator = [ownerNumber, botNumber].includes(m.sender);

        if (!sock.public && !isCreator) return;

        await handleAntilink(m, sock, logger, isBotAdmins, isAdmins, isCreator);

        const pluginDir = path.resolve(__dirname, '..', 'plugins');
        const pluginFiles = await fs.readdir(pluginDir);

        for (const file of pluginFiles) {
            if (!file.endsWith('.js')) continue;

            const pluginPath = path.join(pluginDir, file);

            try {
                const plugin = (await import(`file://${pluginPath}`)).default;
                if (typeof plugin === 'function') {
                    await plugin(m, sock, { cmd, text, isAdmins, isBotAdmins, isCreator });
                }
            } catch (err) {
                console.error(`❌ Plugin error: ${file}`, err);
            }
        }

    } catch (err) {
        console.error('❌ Handler Error:', err);
    }
};

export default Handler;
