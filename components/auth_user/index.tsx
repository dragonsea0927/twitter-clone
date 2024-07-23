"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import ModeToggle from "../ui/modeToggle";
import useRegisterModal from "@/components/modal/hooks/useRegisterModal";
import RegisterModal from "../modal/register-modal";
import LoginModal from "../modal/login-modal";
import useLoginModal from "@/components/modal/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Form } from "../ui/form";
import axios from "axios";
import { IoPersonSharp } from "react-icons/io5";

const Auth = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [error, setError] = useState("");

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const button = event.currentTarget.querySelector(
      'button[data-email][data-submit="true"]'
    );

    if (!button) {
      console.log("No submit button found");
      return;
    }

    const email = button.getAttribute("data-email");

    try {
      const { data } = await axios.post("/api/auth/login", { email });

      if (data.success) {
        signIn("credentials", { email: data.email, password: data.password });
      }
    } catch (error: any) {
      if (error.response?.data?.error) {
        console.log("Error=> ", error.response.data.error);
      } else {
        console.log("Error Something went wrong => ");
      }
    }
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.closest("form");
    const buttons = form?.querySelectorAll("button[data-email]");

    buttons?.forEach((button) => button.removeAttribute("data-submit"));
    event.currentTarget.setAttribute("data-submit", "true");
  };

  return (
    <>
      <RegisterModal />
      <LoginModal />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <FaXTwitter className="justify-self-center hidden md:block h-2/3 w-2/3" />

        <div className="flex flex-col justify-center pb-4 md:justify-between sm:gap-10 gap-5 h-full md:h-[60vh]">
          <FaXTwitter className="block md:hidden justify-self-center h-1/5 w-1/5" />

          <h1 className="text-4xl sm:text-6xl font-bold ">Happening now</h1>

          <div className="w-full max-w-[25rem]">
            <h2 className="font-bold text-3xl mb-4">Join today.</h2>
            <div className="flex flex-col space-y-2">
              <Button
                onClick={() => signIn("google")}
                size={"csize"}
                className="gap-2"
              >
                <FcGoogle size={18} />
                Sign up with Google
              </Button>

              <Button
                onClick={() => signIn("github")}
                size={"csize"}
                className="gap-2"
              >
                <FaGithub size={18} />
                Sign up with Github
              </Button>

              <div className="flex items-center justify-center">
                <div className="h-px bg-gray-700 w-1/2" />
                <p className="mx-4">or</p>
                <div className="h-px bg-gray-700 w-1/2" />
              </div>

              <Button
                onClick={onOpenRegisterModal}
                size={"csize"}
                className="gap-2 bg-sky-500 text-white hover:bg-sky-500"
              >
                Create account
              </Button>
              <div className="text-[10px]">
                By signing up, you agree to the{" "}
                <span className="text-sky-500">Terms of Service</span> and
                <span className="text-sky-500"> Privacy Policy</span>, including
                <span className="text-sky-500"> Cookie Use</span>.
              </div>
              <ModeToggle />
            </div>
          </div>

          <div className="w-full max-w-[25rem]">
            <div>
              <h3 className="font-medium text-xl mb-4">
                Already have an account?
              </h3>
              <Button
                onClick={onOpenLoginModal}
                variant={"outline"}
                size={"csize"}
                className="text-sky-500 border-sky-500"
              >
                Sign in
              </Button>
            </div>
          </div>
          <div className="w-full max-w-[25rem]">
            <form onSubmit={onSubmit}>
              <div className="flex justify-evenly flex-row">
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    type="submit"
                    className="h-16 w-16"
                    data-email={process.env.NEXT_PUBLIC_DEMO_USER_ALEX_EMAIL}
                    onClick={handleButtonClick}
                  >
                   <IoPersonSharp size={22}/>
                  </Button>
                  <span className="text-sm">Alex Smith</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    type="submit"
                    className="h-16 w-16"
                    data-email={process.env.NEXT_PUBLIC_DEMO_USER_TAYLOR_EMAIL}
                    onClick={handleButtonClick}
                  >
                     <IoPersonSharp size={22}/>
                  </Button>
                  <span className="text-sm">Taylor Johnson</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <Button
                    type="submit"
                    className="h-16 w-16"
                    data-email={process.env.NEXT_PUBLIC_DEMO_USER_MORGAN_EMAIL}
                    onClick={handleButtonClick}
                  >
                    <IoPersonSharp size={22}/>
                  </Button>
                  <span className="text-sm">Morgan Brown</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
