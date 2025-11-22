import Link from "next/link";

const ButtonLogin = (props) => {
  if (props.isLoggedIn) {
    return <Link href="/dashboard">Dashboard</Link>;
  } else {
    return <Link href="/login">Login</Link>;
  }
};

export default ButtonLogin;
