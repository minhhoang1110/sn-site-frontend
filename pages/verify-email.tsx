import { AuthenticationAPI } from "@/api";
import Loader from "@/components/commons/Loader";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const VerifyEmail: React.FC = () => {
  const [loadText, setLoadText] = useState<string>("Đang xác thực email");
  const router = useRouter();
  const { token } = router.query;
  useEffect(() => {
    if (!token) return;
    AuthenticationAPI.verifyEmail(token.toString())
      .then((res) => {
        if (res.data.success) {
          setLoadText("Xác thực email thành công");
          setTimeout(() => {
            router.push("/setting");
          }, 1000);
        }
      })
      .catch((error) => {});
  });
  return <Loader width="w-screen" height="h-screen" text={loadText} />;
};
export default VerifyEmail;
