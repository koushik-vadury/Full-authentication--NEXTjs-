import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [token, setToken] = useState();

  useEffect(() => {
    const tokenFromLS = localStorage.getItem("user");
    if (tokenFromLS) {
      setToken(tokenFromLS);
    } else {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      {token && (
        <div
          style={{
            fontSize: "2rem",
            textAlign: "center",
            margin: "17rem",
            color: "white",
          }}
        >
          <Link href="/">BACK TO SIGNUP</Link>
          <div> Dashboard</div>
        </div>
      )}
    </>
  );
}
