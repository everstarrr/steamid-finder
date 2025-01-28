import axios from "axios";
import { NextResponse } from "next/server";

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

        return NextResponse.json(
            {
                data: response.data,
                date: new Date().toLocaleTimeString(),
            },
            {
                status: 200,
                headers: {
                    "Content-Type": "application/xml",
                },
            }
        );

        // // Преобразуем обратно в XML
        // return new Response(response.data, {
        //     status: 200,
        //     headers: {
        //         "Content-Type": "application/xml",
        //         "Cache-Control": "public, max-age=3600, stale-while-revalidate=60",
        //     },
        // });
    } catch {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
