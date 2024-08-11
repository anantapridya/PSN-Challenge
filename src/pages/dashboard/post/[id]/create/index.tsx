import Navbar from "@/component/Navbar";
import { authenticateToken } from "@/lib/auth";
import { useCreateComment } from "@/services/useCreateComment";
import { postSchema, PostSchema } from "@/validation/PostValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

export default function CreatePost() {
  const { control, formState, handleSubmit, setValue } = useForm<PostSchema>({
    resolver: yupResolver(postSchema),
  });
  const router = useRouter();
  const { id } = router.query;

  const createComment = useCreateComment();

  useEffect(() => {
    setValue("id", id as any);
  }, []);
  const onSubmit = async (data: PostSchema) => {
    try {
      createComment.mutateAsync(data);
      toast.success("Comment Successfully Created", {
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      setTimeout(() => {
        router.push("/dashboard/post");
      }, 2000);
    } catch (error) {
      toast.error("Comment Failed to Create", {
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    }
    console.log({ data });
  };
  // const notify = () => toast("This is a toast notification !");
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10">
      <Navbar />
      <div className="md:grid grid-cols-2 gap-x-5 flex flex-col gap-y-3 mt-20">
        <div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Name
              </span>
            </div>
            <div className="custom-file">
              <Controller
                control={control}
                name="name"
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      aria-label="Username"
                      aria-describedby="addon-wrapping"
                      {...rest}
                    />
                  </>
                )}
              />
            </div>
          </div>
          {formState.errors.name && (
            <small id="emailHelp" className="form-text text-red-700 block">
              {formState.errors.name.message}
            </small>
          )}
        </div>
        <div>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroupFileAddon01">
                Email
              </span>
            </div>
            <div className="custom-file">
              <Controller
                control={control}
                name="email"
                render={({ field: { ref, ...rest }, fieldState }) => (
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="addon-wrapping"
                    {...rest}
                  />
                )}
              />
            </div>
          </div>
          {formState.errors.email && (
            <small id="emailHelp" className="form-text text-red-700 block">
              {formState.errors.email.message}
            </small>
          )}
        </div>
      </div>
      <div className="mt-3 md:mt-0">
        <div className="custom-file ">
          <Controller
            control={control}
            name="body"
            render={({ field: { ref, ...rest }, fieldState }) => (
              <textarea
                className="form-control"
                placeholder="Comment"
                aria-label="Comment"
                aria-describedby="addon-wrapping"
                {...rest}
              />
            )}
          />
          {formState.errors.body && (
            <small id="emailHelp" className="form-text text-red-700 block">
              {formState.errors.body.message}
            </small>
          )}
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        Submit
      </button>
      <ToastContainer />
    </form>
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
