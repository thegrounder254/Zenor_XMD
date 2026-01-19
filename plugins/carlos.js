import config from "../../config.cjs";
import ytSearch from "yt-search";
import fetch from "node-fetch";

const DOWNLOAD_APIS = [
    "https://ditzdevs-ytdl-api.hf.space/api/ytmp3?url=",
    "https://api.siputzx.my.id/api/d/ytmp3?url=",
    "https://apisnothing.vercel.app/api/download/ytmp3?url="
];

const play = async (message, client) => {
    const prefix = config.PREFIX;
    if (!message.body?.startsWith(prefix)) return;

    const args = message.body.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift()?.toLowerCase();
    const query = args.join(" ");

    if (command !== "play1") return;
    if (!query) return message.reply("❌ *Please provide a song name or YouTube link!*");

    await message.reply("⏳ *Searching for the best match...*");

    try {
        const searchResults = await ytSearch(query);
        if (!searchResults.videos.length) {
            return message.reply("❌ *No results found!*");
        }

        const video = searchResults.videos[0];
        const videoUrl = video.url;

        const caption =
`🎵 *Title:* ${video.title}
📺 *Channel:* ${video.author.name}
👁 *Views:* ${video.views}
⏳ *Duration:* ${video.timestamp}

📥 *Reply with:*
1️⃣ Video
2️⃣ Audio`;

        const sentMsg = await client.sendMessage(
            message.chat,
            { image: { url: video.thumbnail }, caption },
            { quoted: message }
        );

        const botMsgId = sentMsg.key.id;

        const listener = async (upsert) => {
            const msg = upsert.messages?.[0];
            if (!msg || !msg.message || msg.key.fromMe) return;

            const text =
                msg.message.conversation ||
                msg.message.extendedTextMessage?.text ||
                "";

            const isReply =
                msg.message.extendedTextMessage?.contextInfo?.stanzaId === botMsgId;

            if (!isReply) return;

            client.ev.off("messages.upsert", listener);
            clearTimeout(timeout);

            try {
                let mediaUrl, mediaType, mimetype;

                if (text === "1") {
                    mediaType = "video";
                    mimetype = "video/mp4";

                    const res = await fetch(
                        `https://apis.davidcyriltech.my.id/download/ytmp4?url=${videoUrl}`
                    );
                    const data = await res.json();

                    mediaUrl = data?.result?.download_url;
                }
                else if (text === "2") {
                    mediaType = "audio";
                    mimetype = "audio/mpeg";
                    mediaUrl = await getAvailableMp3Url(videoUrl);
                }
                else {
                    return client.sendMessage(
                        message.chat,
                        { text: "❌ *Invalid selection. Reply with 1 or 2 only.*" },
                        { quoted: msg }
                    );
                }

                if (!mediaUrl) {
                    return message.reply("❌ *Failed to download. Try another song.*");
                }

                await client.sendMessage(
                    message.chat,
                    {
                        [mediaType]: { url: mediaUrl },
                        mimetype,
                        caption:
`🎶 *BUDDY MUSIC PLAYER*

🔹 *Title:* ${video.title}
🔹 *Format:* ${mediaType.toUpperCase()}

🤺 *Enjoy your download!*`,
                    },
                    { quoted: msg }
                );

            } catch (err) {
                console.error("Download error:", err);
                message.reply("❌ *An error occurred while downloading.*");
            }
        };

        client.ev.on("messages.upsert", listener);

        // ⏱ Auto-timeout after 60s
        const timeout = setTimeout(() => {
            client.ev.off("messages.upsert", listener);
        }, 60_000);

    } catch (err) {
        console.error("Play command error:", err);
        message.reply("❌ *Something went wrong while processing your request.*");
    }
};

const getAvailableMp3Url = async (videoUrl) => {
    for (const api of DOWNLOAD_APIS) {
        try {
            const res = await fetch(`${api}${videoUrl}`);
            const data = await res.json();

            const url =
                data?.result?.download_url ||
                data?.result?.url ||
                data?.url;

            if (url) return url;
        } catch {
            console.warn(`MP3 API failed: ${api}`);
        }
    }
    return null;
};

export default play;
