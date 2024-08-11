import client from "@/client/client";
import { useMutation } from "react-query";

export function useDeletePost(id: number) {
    return useMutation({
        async mutationFn() {
            return client.api.delete(`/posts/${id}`)
        }
    })
}