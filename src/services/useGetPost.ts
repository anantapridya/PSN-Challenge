import client from "@/client/client"
import { PREFIX_KEY } from "@/constant/common"
import { IPost } from "@/type/Post"
import { useQuery } from "react-query"

type GetPostResponse = IPost[]


export const useGetPosts = () => {
    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'POST'],
        async queryFn() {
            const response = await client.api.get<GetPostResponse>(`/posts`)

            return response.data
        }
    })
}