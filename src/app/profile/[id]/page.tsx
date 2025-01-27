'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

type SteamInfo = {
    steamID: string | null
    avatar: string | null
    regDate: string | null
    onlineState: string | null
}

export default function UserProfile() {

    const [data, setData] = useState<SteamInfo | null>(null);

    useEffect(() => {
        const cached = sessionStorage.getItem("steamInfo");
        if (cached) {
            const { data, expiresAt } = JSON.parse(cached);

            if (Date.now() < expiresAt) {
                // Данные валидны
                setData(data);
            } else {
                // Данные устарели
                sessionStorage.removeItem("steamInfo");
            }
        }
    }, []);

    return (
        <>
            <h1 className="text-2xl">Информация о профиле</h1>
            <section className="rounded-lg bg-neutral-800 border-2 border-neutral-700 flex flex-col gap-6 p-6 w-full">
                {!!data?.avatar &&
                    <Image width={64} height={64} alt="avatar" src={data.avatar} className="rounded-full" />
                }
                {!!data?.onlineState &&
                    <>
                        {data.onlineState === 'online' ?
                            <p className="text-green-500">Онлайн</p>
                            :
                            <p className="text-red-500">Оффлайн</p>
                        }
                    </>
                }
                {!!data?.regDate &&
                    <p>Дата регистрации: {data.regDate}</p>
                }
                {!!data?.steamID &&
                    <p>Steam ID: {data.steamID}</p>
                }
            </section>
        </>
    )
}