import { NextPage } from "next";
import Link from "next/link";

const NotFoundPage: NextPage = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link href="/">Go to Home</Link>
    </section>
  );
};

export default NotFoundPage;
