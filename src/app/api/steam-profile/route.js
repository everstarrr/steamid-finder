import axios from "axios";
import { XMLBuilder } from 'fast-xml-parser';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const steamId = searchParams.get("steamId");

    if (!steamId) {
        return new Response(JSON.stringify({ error: "steamId is required" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    try {
        const response = await axios.get(
            `https://steamcommunity.com/profiles/${steamId}?xml=1`
        );
        // Получаем текущее время
        const requestDate = new Date().toISOString();

        // Парсим XML
        const parser = new XMLBuilder({});
        const xmlObj = parser.parse(response.data);

        // Добавляем время в XML
        xmlObj.requestDate = requestDate;

        // Преобразуем обратно в XML
        const updatedXml = parser.build(xmlObj);
        return new Response(
          updatedXml, {
            status: 200,
            headers: {
                "Content-Type": "application/xml",
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
