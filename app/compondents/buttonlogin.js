import Link from "next/link";

const ButtonLogin = (props) => {
  if (props.isLoggedIn) {
    return (
      <Link href="/dashboard" className="btn btn-primary">
        Dashboard
      </Link>
    );
  } else {
    return (
      <Link
        href="/login"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Login
      </Link>
    );
  }
};

export default ButtonLogin;
