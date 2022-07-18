import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";
import Header from "../components/shared/Header";

const noHeader = ["/auth"];

const PageLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("shop_auth_key");
    if (!jwt && router.pathname.startsWith("/protected")) router.push("/auth");
  }, [router]);

  const showHeader = useMemo(() => {
    const el = noHeader.find((p) => router.pathname.includes(p));
    if (el) return false;
    return true;
  }, [router.pathname]);

  return (
    <>
      {showHeader && <Header />}
      <main>{children}</main>
    </>
  );
};

export default PageLayout;
