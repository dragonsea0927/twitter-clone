"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback } from "react";
import { FcGoogle } from "react-icons/fc";
import ModeToggle from "../ui/modeToggle";
import useRegisterModal from "@/components/modal/hooks/useRegisterModal";
import RegisterModal from "../modal/register-modal";
import LoginModal from "../modal/login-modal";
import useLoginModal from "@/components/modal/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Auth = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const onOpenRegisterModal = useCallback(() => {
    registerModal.onOpen();
  }, [registerModal]);

  const onOpenLoginModal = useCallback(() => {
    loginModal.onOpen();
  }, [loginModal]);

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center h-screen">
        <FaXTwitter className="justify-self-center hidden md:block h-2/3 w-2/3" />

        <div className="flex flex-col justify-center md:justify-between sm:gap-10 gap-5 h-full md:h-[60vh]">
          <FaXTwitter className="block md:hidden justify-self-center h-2/6 w-2/6" />

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
      </div>
    </>
  );
};

export default Auth;
