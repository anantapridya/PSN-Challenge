import client from "@/client/client";
import { PREFIX_KEY } from "@/constant/common";
import { IPost } from "@/type/Post";
import { PostSchema } from "@/validation/PostValidation";
import { useMutation, useQuery } from "react-query";

export const useCreateComment = () => {
    return useMutation({
        async mutationFn(data: PostSchema) {
            const response = await client.api.post('/comments', {
                name: data.name,
                email: data.email,
                body: data.body
            })

            return response
        }
    })
}
