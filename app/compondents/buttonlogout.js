"use client";
import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  return (
    <button className="btn btn-ghost text-white" onClick={() => signOut()}>
      Logout
    </button>
  );
};

export default ButtonLogout;
