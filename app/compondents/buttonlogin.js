"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";

const ButtonLogin = ({ session, extraStyle }) => {
  const dashboardURL = "/dashboard";
  if (session) {
    return (
      <Link
        href={dashboardURL}
        className={`btn btn-primary text-white ${extraStyle ? extraStyle : ""}`}
      >
        Welcome Back {session.user.name || "Bro"}
      </Link>
    );
  }

  // Plain text button style
  return (
    <button
      className={`btn btn-primary text-white ${extraStyle ? extraStyle : ""}`}
      onClick={() => {
        signIn(undefined, { callbackUrl: dashboardURL });
      }}
    >
      Share a idea
    </button>
  );
};

export default ButtonLogin;
