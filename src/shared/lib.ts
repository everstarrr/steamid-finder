import { XMLParser } from 'fast-xml-parser'

type SteamInfo = {
  steamID: string | null
  avatar: string | null
  regDate: string | null
  onlineState: string | null
}

export function parseXML(xmlString: string): SteamInfo {
  const parser = new XMLParser();
  const xmlDoc = parser.parse(xmlString);

  const steamID = xmlDoc["profile"]["steamID64"]
  const avatar = xmlDoc["profile"]["avatarFull"]
  const regDate = xmlDoc["profile"]["memberSince"]
  const onlineState = xmlDoc["profile"]["onlineState"]

  return { steamID, avatar, regDate, onlineState };
}

export async function getProfileInfo(steamId: string) {
  const res = await fetch(`https://steamid-finder-theta.vercel.app/api/steam-profile?steamId=${steamId}`, {
    next: {
      revalidate: 60
    },
    headers: {
      'Cache-Control': 'max-age=60', // Кеширование на клиенте (1 час)
    },
  })
  const response = await res.json()
  console.log(response.data)
  const date = response.date
  const data = parseXML(response.data)
  return { data, date }
}