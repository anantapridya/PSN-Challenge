import axios from "axios";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

export default function Navbar() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      console.log("cek");
      await axios.post("/api/auth/logout");
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      toast.success("Logout...", {
        autoClose: 2000,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      <ToastContainer />
      <main
        className="bottom-0 fixed top-0 left-0 flex justify-between bg-blue-700 w-full h-5 p-4 items-center"
        style={{ justifyContent: "space-between" }}
      >
        <div>
          <p className="text-white font-bold">PASIFIK SATELIT NUSANTARA</p>
        </div>
        <button className="btn btn-danger" onClick={() => handleLogout()}>
          Logout
        </button>
      </main>
    </>
  );
}
