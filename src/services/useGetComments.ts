import client from "@/client/client"
import { PREFIX_KEY } from "@/constant/common"
import { IComment } from "@/type/Comment"
import { useQuery } from "react-query"

type GetCommentResponse = IComment[]

type Params = {
    id: number
}

export const useGetComments = (params: Params) => {
    return useQuery({
        queryKey: [PREFIX_KEY.GET, 'COMMENTS', params.id],
        async queryFn() {
            const response = await client.api.get<GetCommentResponse>(`posts/${params.id}/comments`)

            return response.data
        }
    })
}