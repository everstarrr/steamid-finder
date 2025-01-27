import axios from 'axios'
import Cookies from 'js-cookie'

type SteamInfo = {
  steamID: string | null
  avatar: string | null
  regDate: string | null
  onlineState: string | null
}

export function parseXML(xmlString: string): SteamInfo {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, "application/xml");

  // Проверяем на наличие ошибок парсинга
  const parseError = xmlDoc.querySelector("parsererror");
  if (parseError) {
    throw new Error("Error parsing XML: " + parseError.textContent);
  }

  // Пример извлечения данных
  const steamID = xmlDoc.getElementsByTagName("steamID64")[0].childNodes[0].nodeValue;
  const avatar = xmlDoc.getElementsByTagName("avatarFull")[0].childNodes[0].nodeValue;
  const regDate = xmlDoc.getElementsByTagName("memberSince")[0].childNodes[0].nodeValue;
  const onlineState = xmlDoc.getElementsByTagName("onlineState")[0].childNodes[0].nodeValue;

  return { steamID, avatar, regDate, onlineState };
}

// Функция для установки cookie
export function setCookie(name: string, value: any, options = {}) {
  // Преобразуем объект в строку JSON, если это необходимо
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }

  Cookies.set(name, value, options);
}

// Функция для получения cookie
export function getCookie(name: string) {
  const cookieValue = Cookies.get(name);

  if (cookieValue) {
    try {
      // Преобразуем строку JSON обратно в объект
      return JSON.parse(cookieValue);
    } catch (e) {
      // Если cookie не является JSON, просто возвращаем строку
      return cookieValue;
    }
  }
  return null;
}

export async function getProfileInfo(steamId: string) {
  const response = await axios.get(`/api/steam-profile`, {
    params: {
      steamId: steamId
    }
  })
  const data = parseXML(response.data)
  setCookie(steamId, JSON.stringify(data), { expires: Date.now() + 60 * 60 * 1000 })
  return { data }
}