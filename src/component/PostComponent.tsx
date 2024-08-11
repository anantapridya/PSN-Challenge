import Image from "next/image";
import commentIco from "/public/assets/chat.svg";
import { useState } from "react";
import CommentComponent from "@/component/CommentComponent";
import { useGetPosts } from "@/services/useGetPost";
import { IPost } from "@/type/Post";
import { useGetDetailUser } from "@/services/useGetDetailUser";
import { useGetComments } from "@/services/useGetComments";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useRouter } from "next/router";

type PostComponentProps = {
  post: IPost;
};

export default function PostComponent({ post }: PostComponentProps) {
  const [openComment, setOpenComment] = useState<boolean>(false);
  const getUserDetail = useGetDetailUser({ id: post.userId });
  const getComment = useGetComments({ id: post.id });
  const router = useRouter();
  return (
    <main className=" w-full border broder-2 p-2">
      <div
        onClick={() => setOpenComment(!openComment)}
        className=" cursor-pointer "
      >
        <div className="cursor-pointer">
          <p className="font-bold">
            {getUserDetail.data?.username ?? "Anonymous"}
          </p>
          <p className="text-justify font-bold italic underline">
            {post.title}
          </p>
          <p className="text-justify">{post.body}</p>
        </div>
        <div className="mt-2 flex items-center">
          <Image src={commentIco} alt="icon comment" />
          <p className="ml-2">{getComment.data?.length}</p>
        </div>
      </div>
      {/* {openComment &&
        getComment.data?.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))} */}
      {openComment && (
        <div className="p-2">
          <DataTable value={getComment.data} scrollable>
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="body" header="Comment"></Column>
          </DataTable>
          <button
            type="button"
            onClick={() => router.push(`/dashboard/post/${post.id}/create`)}
            className="btn btn-primary"
          >
            Create Comment
          </button>
        </div>
      )}
    </main>
  );
}
