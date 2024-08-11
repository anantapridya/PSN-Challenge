import client from "@/client/client"
import { PREFIX_KEY } from "@/constant/common"
import { IUser } from "@/type/User"
import { useQuery } from "react-query"

type GetUserResponse = IUser[]

export const useGetUser = () => {
    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'USERS'],
        async queryFn() {
            const response = await client.api.get<GetUserResponse>('/users')

            return response.data
        }
    })
}