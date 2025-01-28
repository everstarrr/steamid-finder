import { getProfileInfo } from "@/shared/lib";
import Image from "next/image";

export const revalidate = 60;

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const { data, date } = await getProfileInfo(id)


    return (
        <>
            <h1 className="text-2xl">Информация о профиле</h1>
            <section className="rounded-lg bg-neutral-800 border-2 border-neutral-700 flex flex-col gap-6 p-6 w-full">
                {!!data.avatar &&
                    <Image width={64} height={64} alt="avatar" src={data.avatar} className="rounded-full" />
                }
                {data.onlineState === 'online' ?
                    <p className="text-green-500">Онлайн</p>
                    :
                    <p className="text-red-500">Оффлайн</p>
                }
                <p>Дата регистрации: {data.regDate}</p>
                <p>Steam ID: {data.steamID}</p>
                <p>Текущее время: {date}</p>
            </section>
        </>
    )
}