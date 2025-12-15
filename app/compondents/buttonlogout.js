"use client";
import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  return (
    <button
      className="btn btn-outline btn-sm btn-error/80 gap-2"
      onClick={() => signOut()}
    >
      <span>Logout</span>
      <span className="text-lg leading-none">↗</span>
    </button>
  );
};

export default ButtonLogout;
