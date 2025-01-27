'use client'

import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type FormData = {
    id: string
}

type SteamInfo = {
    steamID: string | null
    avatar: string | null
    regDate: string | null
    onlineState: string | null
}

function parseXML(xmlString: string): SteamInfo {
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

export default function SteamIdFinder() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const { push } = useRouter()

    const onSubmit: SubmitHandler<FormData> = async (steamid64) => {
        try {
            const response = await axios.get(`/api/steam-profile`, {
                params: {
                    steamId: steamid64.id
                }
            })
            const data = parseXML(response.data)
            sessionStorage.setItem(
                "steamInfo",
                JSON.stringify({
                    data,
                    expiresAt: Date.now() + 60 * 60 * 1000, // Кеш на 1 час
                })
            );
            push(`/profile/${data.steamID}`)
            console.log('SUCCESS')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h1 className="text-2xl text-center">Steam Id Finder</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-4">
                <input className="w-48 rounded-md text-lg text-black px-2" maxLength={17} {...register('id', {
                    minLength: 17,
                    maxLength: 17,
                    validate: (value) => !isNaN(Number(value))
                })} />
                {!!errors.id &&
                    <p role="alert" className="text-red-600">Enter 17 number Steam ID</p>
                }
                <button className="bg-blue-500 rounded-md p-3 w-48">Fetch</button>
            </form>
        </>
    )
}