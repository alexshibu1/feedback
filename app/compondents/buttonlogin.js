import Link from "next/link";

const ButtonLogin = ({ isLoggedIn, name, extraStyle }) => {
  if (isLoggedIn) {
    return (
      <Link
        href="/dashboard"
        className={`btn btn-primary ${extraStyle ? extraStyle : ""}`}
      >
        Welcome Back {name}
      </Link>
    );
  }

  // Plain text button style
  return (
    <button className="!bg-transparent !border-none !p-0 text-gray-900 hover:text-gray-700 text-base font-normal cursor-pointer shadow-none">
      Login
    </button>
  );
};

export default ButtonLogin;
