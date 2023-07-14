import dynamic from "next/dynamic";
import DocumentHead from "@/components/DocumentHead";
const LoginForm = dynamic(() => import("@/components/LoginForm"));
const Modal = dynamic(() => import("@/components/Modal"));
const Signup = dynamic(() => import("@/components/Signup"));
import React, { useState } from "react";
const Login: React.FC = () => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [openSignup, setOpenSignup] = useState<boolean>(false);
  return (
    <div className="flex items-center justify-center flex-col w-screen h-screen bg-slate-200">
      <DocumentHead title="Login" />
      <h1 className="text-center text-sky-600 mb-5 font-bold text-6xl">
        SN Site
      </h1>
      <LoginForm setIsSubmit={setIsSubmit} setOpenSignup={setOpenSignup} />
      <Modal
        content="Đang đăng nhập"
        hasFooter={false}
        open={isSubmit}
        setOpen={setIsSubmit}
        textAlign="center"
        fontSize="xl"
        boldText
      />
      <Signup open={openSignup} setOpen={setOpenSignup} />
    </div>
  );
};
export default Login;
