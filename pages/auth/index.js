import { useRouter } from "next/router";
import React, { useEffect } from "react";

const AuthIndex = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login");
  }, [router]);

  return <div></div>;
};

export default AuthIndex;
