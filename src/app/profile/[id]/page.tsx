import { getProfileInfo } from "@/shared/lib";
import Image from "next/image";

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params

    const info = await getProfileInfo(id)


    return (
        <>
            <h1 className="text-2xl">Информация о профиле</h1>
            <section className="rounded-lg bg-neutral-800 border-2 border-neutral-700 flex flex-col gap-6 p-6 w-full">
                {!!info.data?.avatar &&
                    <Image width={64} height={64} alt="avatar" src={info.data.avatar} className="rounded-full" />
                }
                {!!info.data?.onlineState &&
                    <>
                        {info.data.onlineState === 'online' ?
                            <p className="text-green-500">Онлайн</p>
                            :
                            <p className="text-red-500">Оффлайн</p>
                        }
                    </>
                }
                {!!info.data?.regDate &&
                    <p>Дата регистрации: {info.data.regDate}</p>
                }
                {!!info.data?.steamID &&
                    <p>Steam ID: {info.data.steamID}</p>
                }
                <p>Текущая дата: {Date.now()}</p>
            </section>
        </>
    )
}