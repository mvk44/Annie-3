import util from 'util'
import path from 'path'

async function handler(m, { groupMetadata, command, conn, text, usedPrefix }) {
  let user = a => '@' + a.split('@')[0]
  if (!text) throw `*⚠️ EJEMPLO DE USO:*\n${usedPrefix + command} nombre1 nombre2 nombre3`
  
  // Obtener una lista de nombres o números proporcionados por el usuario
  let entries = text.trim().split(' ');

  // Si no se proporciona al menos un nombre o número, mostrar un mensaje de error
  if (entries.length === 0) throw 'Debes proporcionar al menos un nombre o número para el sorteo.';

  let winner = pickRandom(entries); // Elegir un ganador al azar de la lista

  let k = Math.floor(Math.random() * 70)
  let vn = `https://hansxd.nasihosting.com/sound/sound${k}.mp3`
  let top = `*😼 ${user(winner)} Acaba de ganar el sorteo felicitaciones 🎉*`
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

handler.help = ['sorteo2']
handler.command = ['sorteo2']
handler.tags = ['juegos']
handler.group = true
handler.admin = true

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
