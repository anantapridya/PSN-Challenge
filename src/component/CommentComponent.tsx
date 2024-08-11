import { IComment } from "@/type/Comment";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useGetComments } from "@/services/useGetComments";
import Image from "next/image";
import { useRouter } from "next/router";

type CommentComponentProps = {
  comment: number;
};

export default function CommentComponent({ comment }: CommentComponentProps) {
  const getComment = useGetComments({ id: comment });
  const router = useRouter();

  return (
    <main className="px-4 py-2">
      {getComment.data?.map((comment) => {
        return (
          <div className=" cursor-pointer border p-2 mb-1">
            <div className="cursor-pointer">
              <p className="font-bold">{comment.name ?? "Anonymous"}</p>
              <p className="text-justify font-bold italic underline">
                {comment.email}
              </p>
              <p className="text-justify">{comment.body}</p>
            </div>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => router.push(`/dashboard/post/${comment}/create`)}
        className="btn btn-primary mt-1"
      >
        Create Comment
      </button>
    </main>
  );
}
