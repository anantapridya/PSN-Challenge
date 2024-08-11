import { Controller, useForm } from "react-hook-form";
import { userSchema, UserSchema } from "@/validation/UserCredential";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetUser } from "@/services/useGetUser";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

export default function Home() {
  const { control, formState, handleSubmit } = useForm<UserSchema>({
    resolver: yupResolver(userSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: UserSchema) => {
    try {
      const response = await axios.post("/api/auth/login", data);
      console.log({ response });
      document.cookie = `token=${response.data.token}; path=/`;
      console.log(response.data.token);
      toast.success("Login Successfully", {
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      setTimeout(() => {
        router.push("/dashboard/post");
      }, 2000);
    } catch (error) {
      toast.error("Login Failed", {
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
      console.error("Login failed:", error);
    }
  };
  return (
    <main className="h-screen w-screen flex flex-col md:flex-row">
      <ToastContainer />
      <div className="w-full h-full flex flex-col items-center justify-center bg-blue-700 p-4 rounded-r-xl">
        <p className="font-bold text-2xl md:text-4xl text-white mb-2 md:mb-4 text-center">
          Welcome to Frontend Developer Test
        </p>
        <p className="text-white text-sm md:text-base text-center">
          PT Pasifik Satelit Nusantara
        </p>
      </div>
      <div className="w-full  h-full flex flex-col items-center justify-center p-4 bg-white">
        <p className="text-lg md:text-2xl mb-4">Login</p>
        <form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-4">
            <label htmlFor="username" className="block mb-1">
              Username
            </label>
            <Controller
              control={control}
              name="username"
              render={({ field: { ref, ...rest }, fieldState }) => (
                <input
                  type="text"
                  className="form-control w-full border border-gray-300 p-2 rounded"
                  id="username"
                  aria-describedby="emailHelp"
                  {...rest}
                />
              )}
            />
            {formState.errors.username && (
              <small
                id="emailHelp"
                className="form-text text-red-700 block mt-1"
              >
                {formState.errors.username.message}
              </small>
            )}
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <Controller
              control={control}
              name="password"
              render={({ field: { ref, ...rest }, fieldState }) => (
                <input
                  type="password"
                  className="form-control w-full border border-gray-300 p-2 rounded"
                  id="password"
                  {...rest}
                />
              )}
            />
            {formState.errors.password && (
              <small
                id="emailHelp"
                className="form-text text-red-700 block mt-1"
              >
                {formState.errors.password.message}
              </small>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary bg-blue-500 text-white py-2 rounded w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = parseCookies(context);

  // Jika token ada di cookies, redirect ke halaman dashboard
  if (cookies.token) {
    return {
      redirect: {
        destination: "/dashboard/post",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Tidak ada props yang perlu dikirim ke halaman login
  };
};
