import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

type SteamInfo = {
  steamID: string | null
  avatar: string | null
  regDate: string | null
  onlineState: string | null
  requestDate: string | null
}

export function parseXML(xmlString: string): SteamInfo {
  const parser = new XMLParser();
  const xmlDoc = parser.parse(xmlString);

  const steamID = xmlDoc["profile"]["steamID64"]
  const avatar = xmlDoc["profile"]["avatarFull"]
  const regDate = xmlDoc["profile"]["memberSince"]
  const onlineState = xmlDoc["profile"]["onlineState"]
  const requestDate = xmlDoc["profile"]["requestDate"]

  return { steamID, avatar, regDate, onlineState, requestDate};
}

export async function getProfileInfo(steamId: string) {
  const response = await axios.get(`https://steamid-finder-theta.vercel.app/api/steam-profile`, {
    params: { steamId: steamId },
    headers: {
      'Cache-Control': 'max-age=60', // Кеширование на клиенте (1 час)
    },
  })
  const data = parseXML(response.data)
  console.log(data)
  return { data }
}