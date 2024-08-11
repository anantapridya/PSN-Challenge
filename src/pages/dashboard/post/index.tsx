import { useEffect, useState } from "react";
import { useGetPosts } from "@/services/useGetPost";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import CommentComponent from "@/component/CommentComponent";
import { useDeletePost } from "@/services/useDeletePost";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps } from "next";
import { authenticateToken } from "@/lib/auth";
import axios from "axios";
import Navbar from "@/component/Navbar";

export default function Post() {
  const [search, setSearch] = useState("");
  const getPost = useGetPosts();
  const router = useRouter();
  const filteredPost = getPost.data?.filter((post) =>
    post.body.toLowerCase().includes(search.toLowerCase())
  );
  const Comment = (data: any) => {
    return (
      <div>
        <CommentComponent comment={data.id} />
      </div>
    );
  };

  const Action = (data: any) => {
    const deletePost = useDeletePost(data);

    const handleDelete = async () => {
      try {
        await deletePost.mutateAsync(data);
        toast.success("Post Successfully Deleted", {
          autoClose: 2000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      } catch (error) {
        toast.error("Post Failed to Delete", {
          autoClose: 2000,
          pauseOnHover: false,
          pauseOnFocusLoss: false,
        });
      }
    };
    return (
      <div className="w-full h-full flex items-start justify-start">
        <button className="btn btn-danger" onClick={handleDelete}>
          delete
        </button>
      </div>
    );
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <main className="h-screen w-screen flex md:grid  bg-white p-2">
      <Navbar />
      <ToastContainer />
      <div className="w-full col-span-2 md:col-span-3 overflow-auto mt-20">
        <div className="sticky top-0 bg-white z-10 py-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Post"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="">
          <DataTable
            value={filteredPost}
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="responsive-datatable"
          >
            <Column field="id" header="Id"></Column>
            <Column field="title" header="Title"></Column>
            <Column field="body" header="Body"></Column>
            <Column field="id" header="Comment" body={Comment}></Column>
            <Column field="id" header="Action" body={Action}></Column>
          </DataTable>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.token;
  const user = authenticateToken(token);
  console.log(user);

  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // No need to pass any props here
  };
};
