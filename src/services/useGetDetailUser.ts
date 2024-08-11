import client from "@/client/client";
import { PREFIX_KEY } from "@/constant/common";
import { IUser } from "@/type/User";
import { useQuery } from "react-query";

type GetUserResponse = IUser

type Params = {
    id: number
}

export const useGetDetailUser = (params: Params) => {
    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'DETAILUSER', params.id],
        async queryFn() {
            const response = await client.api.get<GetUserResponse>(`/users/${params.id}`)

            return response.data
        }
    })
}