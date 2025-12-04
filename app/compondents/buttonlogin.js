"use client";
import Link from "next/link";

const ButtonLogin = ({ session, extraStyle }) => {
  if (session) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary text-white ${extraStyle ? extraStyle : ""}`}
      >
        Welcome Back {session.user.name || "Bro"}
      </Link>
    );
  }

  // Plain text button style
  return <button>Login</button>;
};

export default ButtonLogin;
