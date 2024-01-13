import util from 'util'
import path from 'path'

async function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {
  if (!text) throw `*⚠️ EJEMPLO DE USO:*\n${usedPrefix + command} @usuario1 @usuario2 @usuario3`
  
  // Obtener una lista de participantes mencionados en el comando
  let entries = text.match(/@(\d{5,}|[a-zA-Z0-9_-]{5,})/g) || [];

  // Si no se menciona a al menos un usuario, mostrar un mensaje de error
  if (entries.length === 0) throw 'Debes mencionar al menos a un usuario para el sorteo.';

  let winner = pickRandom(entries); // Elegir un ganador al azar de la lista

  let k = Math.floor(Math.random() * 70)
  let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`
  let top = `*😼 ${winner} Acaba de ganar el sorteo felicitaciones 🎉*`
  let txt = ''
  let count = 0

  for (const c of top) {
    await new Promise(resolve => setTimeout(resolve, 15))
    txt += c
    count++

    if (count % 10 === 0) {
      conn.sendPresenceUpdate('composing', m.chat);
    }
  }

  await conn.sendMessage(m.chat, { text: txt.trim(), mentions: conn.parseMention(txt) }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 })

}

handler.help = ['sorteo']
handler.command = ['sorteo']
handler.tags = ['juegos']
handler.group = true
handler.admin = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
