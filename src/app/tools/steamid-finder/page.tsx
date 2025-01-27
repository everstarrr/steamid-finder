'use client'

import { getProfileInfo } from "@/shared/lib"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

type FormData = {
    id: string
}

export default function SteamIdFinder() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const { push } = useRouter()

    const onSubmit: SubmitHandler<FormData> = async (steamid64) => {
        try {
            getProfileInfo(steamid64.id)
            push(`/profile/${steamid64.id}`)
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